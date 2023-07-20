import { InjectQueue } from '@nestjs/bull';
import { InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { BullAdapter, setQueues } from 'bull-board';
import { Model, Types } from 'mongoose';
import { IQuestionCategoryModel } from 'src/entities/question.category.interface';
import { Question } from 'src/entities/question.entity';
import { IQuestionModel } from 'src/entities/question.interface';
import { QuestionCategory } from 'src/entities/quetion.category.entity';
import { Rapport } from 'src/entities/rapport.entity';
import { IRapportModel } from 'src/entities/rapport.interface';
import { Reponse } from 'src/entities/reponse.entity';
import { Reservation } from 'src/entities/reservation.entity';
import { ReservationStatus } from 'src/entities/reservation.status.enum';
import { FilterQuestionDto } from 'src/modules/rapport/dto/filterQuestion.dto';
import { FilterQuestionCtgDto } from 'src/modules/rapport/dto/filterQuestionCtg.dto';
import { filterRapportDto } from 'src/modules/rapport/dto/filterRapport.dto';
import { questionDto } from 'src/modules/rapport/dto/question.dto';
import { questionCategoryDto } from 'src/modules/rapport/dto/questionCategory.dto';
import { rapportDto } from 'src/modules/rapport/dto/rapport.dto';
import { reponseDto } from 'src/modules/rapport/dto/reponse.dto';
import { reponsesCategoryDto } from 'src/modules/rapport/dto/reponsesCategory.dto';
import { RapportGateway } from 'src/modules/rapport/rapport.gateway';

export class RapportRepository {
  constructor(
    @InjectModel(Rapport.name) private rapportModel: IRapportModel,
    @InjectModel(QuestionCategory.name) private questionCategoryModel: IQuestionCategoryModel,
    @InjectModel(Question.name) private questionModel: IQuestionModel,
    @InjectModel(Reponse.name) private reponseModel: Model<Reponse>,
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
    @InjectQueue('pdfjob') private readonly pdfQueue: Queue,
    private rapportGateway: RapportGateway
  ) {
    setQueues([new BullAdapter(pdfQueue)]);
  }

  async uploadImages(id, images) {
    try {
      const rapport = await this.rapportModel.findById(id);
      rapport.images = images;
      await rapport.save();
      return rapport;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createRapport(rapportDto: rapportDto) {
    try {
      const reservation = await this.reservationModel.findById(rapportDto.reservationId);
      if (!reservation) {
        return new NotFoundException('No Reservation found for provided Id!');
      }

      const rapport = new this.rapportModel(rapportDto);
      await rapport.save();
      reservation.rapportId = rapport._id;
      await reservation.save();
      return rapport;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateRapport(rapportDto: rapportDto, id: any) {
    try {
      const rapport = await this.rapportModel.findById(id);
      //rapport.content = rapportDto.content;
      rapport.etat = rapportDto.etat;
      await rapport.save();
      return rapport;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getSimpleRapportById(id: any) {
    try {
      const rapport = await this.rapportModel.findById(id);
      if (!rapport) return new NotFoundException('No rapport found');
      return rapport;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getRapportById(id: any) {
    try {
      const rapport = await this.rapportModel
        .findById(id)
        .populate('clientId', { fullName: 1, adresse: 1, ville: 1, tel: 1, img: 1 })
        .populate('reservationId');
      if (!rapport) return new NotFoundException('No rapport found');
      return rapport;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateRapportsStatus(ids: string[], status: string) {
    try {
      await this.rapportModel.updateMany(
        {
          _id: {
            $in: ids
          }
        },
        {
          $set: { etat: status }
        }
      );
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async fetchRapports(filterRapportDto: filterRapportDto, group: any) {
    try {
      const aggregate_options = [];

      const options = {
        page: filterRapportDto.pageNumber,
        limit: filterRapportDto.pageSize,
        collation: { locale: 'en' },
        customLabels: {
          totalDocs: 'totalCount',
          docs: 'entities'
        }
      };

      aggregate_options.push({
        $lookup: { from: 'experts', localField: 'expertId', foreignField: '_id', as: 'expert' }
      });

      aggregate_options.push({
        $lookup: { from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client' }
      });

      aggregate_options.push({
        $lookup: { from: 'reservations', localField: 'reservationId', foreignField: '_id', as: 'reservation' }
      });
      aggregate_options.push({
        $lookup: { from: 'reponses', localField: 'reponses', foreignField: '_id', as: 'reponses' }
      });

      aggregate_options.push({
        $addFields: {
          _id: { $toString: '$_id' },
          expertId: { $toString: '$expertId' },
          clientId: { $toString: '$clientId' }
        }
      });

      //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
      const { _id, clientId, expertId, etat } = filterRapportDto.filter;
      interface IMatch {
        clientId?: any;
        expertId?: any;
        etat?: any;
        _id?: any;
      }
      const match: IMatch = {};

      //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
      if (_id) match._id = { $regex: _id, $options: 'i' };
      if (clientId) match.clientId = { $regex: clientId, $options: 'i' };
      if (expertId) match.expertId = { $regex: expertId, $options: 'i' };
      if (etat) match.etat = { $regex: etat, $options: 'i' };

      //filter by date

      aggregate_options.push({ $match: match });

      //GROUPING -- SECOND STAGE
      if (group !== 'false' && parseInt(group) !== 0) {
        const group = {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, // Group By Expression
          data: { $push: '$$ROOT' }
        };

        aggregate_options.push({ $group: group });
      }

      //SORTING -- THIRD STAGE
      const sortOrderU = filterRapportDto.sortField && filterRapportDto.sortOrder === 'desc' ? -1 : 1;
      if (filterRapportDto.sortField === 'date') {
        aggregate_options.push({ $sort: { createdAt: sortOrderU } });
      } else {
        aggregate_options.push({ $sort: { _id: sortOrderU } });
      }

      //LOOKUP/JOIN -- FOURTH STAGE
      // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

      // Set up the aggregation
      const myAggregate = this.rapportModel.aggregate(aggregate_options);

      const rapports = await this.rapportModel.aggregatePaginate(myAggregate, options, null);
      return rapports;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  /////////Question Category
  async createQuestionCategory(questionCategoryDto: questionCategoryDto) {
    try {
      const questionCtg = new this.questionCategoryModel(questionCategoryDto);
      await questionCtg.save();
      return questionCtg;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateQuestionCategory(questionCategoryDto: questionCategoryDto, id: any) {
    try {
      const questionCtg = await this.questionCategoryModel.findById(id);
      if (!questionCtg) {
        return new NotFoundException('Question Category not found');
      }
      questionCtg.category_name = questionCategoryDto.category_name;
      questionCtg.priority = questionCategoryDto.priority;

      await questionCtg.save();
      return questionCtg;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findQuestionCategoryById(id: any) {
    try {
      const questionCtg = await this.questionCategoryModel.findById(id);
      if (!questionCtg) {
        return new NotFoundException('Question Category not found');
      }
      return questionCtg;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteQuestionCategoryById(id: any) {
    try {
      const questionCtg = await this.questionCategoryModel.findByIdAndDelete(id);
      if (!questionCtg) {
        return new NotFoundException('Question Category not found');
      }
      return 'Question Category deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllQuestionCategory() {
    try {
      const questionCtg = await this.questionCategoryModel.find().populate('questions').sort('priority');
      if (!questionCtg || questionCtg.length == 0) {
        return new NotFoundException('No Question Category');
      }
      return questionCtg;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteQuestionCategories(ids: any) {
    try {
      await this.questionCategoryModel.deleteMany({ _id: { $in: ids.ids } });
      return 'Questions categories deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async fetchQuestionCategoriesPaginate(filterQuestionCtgDto: FilterQuestionCtgDto, group: any) {
    try {
      const aggregate_options = [];

      const options = {
        page: filterQuestionCtgDto.pageNumber,
        limit: filterQuestionCtgDto.pageSize,
        collation: { locale: 'en' },
        customLabels: {
          totalDocs: 'totalCount',
          docs: 'entities'
        }
      };

      aggregate_options.push({
        $addFields: {
          _id: { $toString: '$_id' }
        }
      });

      //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
      const { _id, category_name } = filterQuestionCtgDto.filter;
      interface IMatch {
        _id?: any;
        category_name?: any;
      }
      const match: IMatch = {};

      //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
      if (_id) match._id = { $regex: _id, $options: 'i' };
      if (category_name) match.category_name = { $regex: category_name, $options: 'i' };
      //filter by date

      aggregate_options.push({ $match: match });

      //SORTING -- THIRD STAGE
      const sortOrderU = filterQuestionCtgDto.sortField && filterQuestionCtgDto.sortOrder === 'desc' ? -1 : 1;
      if (filterQuestionCtgDto.sortField === 'priority') {
        aggregate_options.push({ $sort: { priority: sortOrderU } });
      } else {
        aggregate_options.push({ $sort: { _id: sortOrderU } });
      }

      //LOOKUP/JOIN -- FOURTH STAGE
      // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

      // Set up the aggregation
      const myAggregate = this.questionCategoryModel.aggregate(aggregate_options);

      const questionCtgs = await this.questionCategoryModel.aggregatePaginate(myAggregate, options, null);
      return questionCtgs;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  ////////CRUD Reponse/////
  async createReponse(reponseDto: reponseDto, expertId: string) {
    try {
      const sess = await this.rapportModel.db.startSession();
      sess.startTransaction();
      const rapport = await this.rapportModel.findById(reponseDto.rapportId, null, { session: sess });
      if (!rapport) {
        return new NotFoundException('No rapport found with provided Id');
      }

      if (rapport.expertId.toString() !== expertId) {
        return new UnauthorizedException('You are not allowed to answer this rapport');
      }

      // if (!rapport.expertId.equals(expertId)) {
      // }

      const response = await this.reponseModel.findOne({
        rapportId: new Types.ObjectId(reponseDto.rapportId),
        questionId: new Types.ObjectId(reponseDto.questionId)
      });

      const colors = await this.questionModel.findById(reponseDto.questionId).select('colors choices').lean();

      const choiceID = colors.choices.indexOf(reponseDto.reponse);

      let color = 'black';
      if (colors.colors && colors.colors.length > choiceID && choiceID !== -1) {
        color = colors.colors[choiceID];
      }

      if (response) return this.updateReponse({ ...reponseDto, color }, response._id);

      const newRespone = new this.reponseModel({ ...reponseDto, color });
      await newRespone.save({ session: sess });
      rapport.reponses.push(newRespone);
      await rapport.save({ session: sess });
      await sess.commitTransaction();
      return newRespone;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateReponse(reponseDto: reponseDto, id: any) {
    try {
      const reponse = await this.reponseModel.findById(id);
      if (!reponse) {
        return new NotFoundException('reponse not found');
      }
      reponse.category_name = reponseDto.category_name;
      reponse.questionId = reponseDto.questionId;
      reponse.reponse = reponseDto.reponse;
      reponse.color = reponseDto.color ? reponseDto.color : 'black';
      reponse.comment = reponseDto.comment;

      await reponse.save();
      return reponse;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findReponseById(id: any) {
    try {
      const reponse = await this.reponseModel.findById(id);
      if (!reponse) {
        return new NotFoundException('Reponse not found');
      }
      return reponse;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findReponsesByRapportId(rapportId: any) {
    try {
      const reponses = await this.reponseModel.find({
        rapportId: {
          $eq: new Types.ObjectId(rapportId)
        }
      });
      if (!reponses || reponses.length == 0) {
        return new NotFoundException('No Reponse Found');
      }
      return reponses;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  ///////////////Question CRUD/////////////
  async createQuestion(questionDto: questionDto) {
    try {
      const sess = await this.questionCategoryModel.db.startSession();
      sess.startTransaction();
      const questionCategory = await this.questionCategoryModel.findById(questionDto.categoryId, null, {
        session: sess
      });
      const question = new this.questionModel(questionDto);
      await question.save({ session: sess });
      questionCategory.questions.push(question);
      await questionCategory.save({ session: sess });
      await sess.commitTransaction();
      return question;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async updateQuestion(questionDto: questionDto, id: any) {
    try {
      const question = await this.questionModel.findById(id);
      if (!question) {
        return new NotFoundException('question not found');
      }
      question.question = questionDto.question;
      question.choices = questionDto.choices;
      question.colors = questionDto.colors;
      question.typeInput = questionDto.typeInput;

      await question.save();
      return question;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findQuestionById(id: any) {
    try {
      const question = await this.questionModel.findById(id);
      if (!question) {
        return new NotFoundException('question not found');
      }
      return question;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async deleteQuestionById(id: any) {
    try {
      const question = await this.questionModel.findByIdAndDelete(id);
      if (!question) {
        return new NotFoundException('question not found');
      }
      return 'question deleted';
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findAllQuestions() {
    try {
      const questions = await this.questionModel.find();
      if (!questions || questions.length == 0) {
        return new NotFoundException('No Question ');
      }
      return questions;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async deleteQuestions(ids: any) {
    try {
      await this.questionModel.deleteMany({ _id: { $in: ids.ids } });
      return 'Questions deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async fetchQuestionsPaginate(filterQuestionCtgDto: FilterQuestionDto, categoryId: any) {
    try {
      const aggregate_options = [];

      const options = {
        page: filterQuestionCtgDto.pageNumber,
        limit: filterQuestionCtgDto.pageSize,
        collation: { locale: 'en' },
        customLabels: {
          totalDocs: 'totalCount',
          docs: 'entities'
        }
      };

      aggregate_options.push({
        $addFields: {
          _id: { $toString: '$_id' }
        }
      });

      //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
      const { _id, question } = filterQuestionCtgDto.filter;
      interface IMatch {
        _id?: any;
        question?: any;
        categoryId?: any;
      }
      const match: IMatch = {};

      //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
      if (categoryId) match.categoryId = { $regex: categoryId, $options: 'i' };
      if (_id) match._id = { $regex: _id, $options: 'i' };
      if (question) match.question = { $regex: question, $options: 'i' };
      //filter by date

      aggregate_options.push({ $match: match });

      //SORTING -- THIRD STAGE
      const sortOrderU = filterQuestionCtgDto.sortField && filterQuestionCtgDto.sortOrder === 'desc' ? -1 : 1;
      if (filterQuestionCtgDto.sortField === 'priority') {
        aggregate_options.push({ $sort: { priority: sortOrderU } });
      } else {
        aggregate_options.push({ $sort: { _id: sortOrderU } });
      }

      //LOOKUP/JOIN -- FOURTH STAGE
      // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

      // Set up the aggregation
      const myAggregate = this.questionModel.aggregate(aggregate_options);

      const questions = await this.questionModel.aggregatePaginate(myAggregate, options, null);
      return questions;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  ///Create ReponsesForCategory
  async createReponsesForCategory(responsesCategoryDto: reponsesCategoryDto, rapportId: any, done: any) {
    try {
      let createdReponse;
      if (done === 'true') {
        const rapport = await this.rapportModel.findById(rapportId).populate('expertId', { fullName: 1, signature: 1 });
        const job = await this.pdfQueue.add('transcode', {
          idRapport: rapportId,
          expertId: rapport.expertId
        }, {priority: 1});
        console.log(job);
        
        const reservation = await this.reservationModel.findById(rapport.reservationId);
        reservation.status = ReservationStatus.COMPLETEE;
        await reservation.save();
        await this.updateRapportsStatus([rapportId], 'COMPLETEE');
        // socket emit to expert
        const updatedReport = await this.rapportModel.findById(rapportId);
        // set timeout
        setTimeout(() => {
          this.rapportGateway.server.emit('reportDone', {
            rapportId,
            status: 'COMPLETEE',
            link: updatedReport.link // link of pdf here once the worker job is done
          });
        }, 12000);
      } else {
        await this.updateRapportsStatus([rapportId], 'EN_COURS');
      }
      return createdReponse;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getReponsesForCategory(rapportId: any, ctgId: any) {
    try {
      const reponses = await this.reponseModel.find({
        rapportId: Types.ObjectId(rapportId),
        categoryId: Types.ObjectId(ctgId)
      });
      console.log('reponses', {
        rapportId: Types.ObjectId(rapportId),
        categoryId: Types.ObjectId(ctgId)
      });

      const rep = {};
      rep['categoryId'] = reponses[0].categoryId;
      for (let i = 0; i < reponses.length; i++) {
        rep['reponseId' + i] = reponses[i]._id;
        rep['question' + i] = reponses[i].questionId;
        rep['choice' + i] = reponses[i].reponse;
        rep['remarque' + i] = reponses[i].comment;
      }
      console.log('rep', rep);
      return rep;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
