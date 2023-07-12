import {Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {FilterQuestionDto} from './dto/filterQuestion.dto';
import {FilterQuestionCtgDto} from './dto/filterQuestionCtg.dto';
import {filterRapportDto} from './dto/filterRapport.dto';
import {questionDto} from './dto/question.dto';
import {questionCategoryDto} from './dto/questionCategory.dto';
import {rapportDto} from './dto/rapport.dto';
import {reponseDto} from './dto/reponse.dto';
import {reponsesCategoryDto} from './dto/reponsesCategory.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Rapport} from "../../entities/rapport.entity";
import {IRapportModel} from "../../entities/rapport.interface";
import {QuestionCategory} from "../../entities/quetion.category.entity";
import {IQuestionCategoryModel} from "../../entities/question.category.interface";
import {Question} from "../../entities/question.entity";
import {IQuestionModel} from "../../entities/question.interface";
import {Reponse} from "../../entities/reponse.entity";
import {Model, Types} from "mongoose";
import {Reservation} from "../../entities/reservation.entity";
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";
import {RapportGateway} from "./rapport.gateway";
import {BullAdapter, setQueues} from "bull-board";
import {ReservationStatus} from "../../entities/reservation.status.enum";
import {GenericRepository} from "../../shared/generic/generic.repository";

@Injectable()
export class RapportService {
    private readonly rapportRepository: GenericRepository<Rapport>
    private readonly reservationRepository: GenericRepository<Reservation>
    private readonly questionCategoryRepository: GenericRepository<QuestionCategory>
    private readonly questionRepository: GenericRepository<Question>
    private readonly reponseRepository: GenericRepository<Reponse>

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
        this.rapportRepository = new GenericRepository<Rapport>(rapportModel);
        this.reservationRepository = new GenericRepository<Reservation>(reservationModel);
        this.questionCategoryRepository = new GenericRepository<QuestionCategory>(questionCategoryModel);
        this.questionRepository = new GenericRepository<Question>(questionModel);
        this.reponseRepository = new GenericRepository<Reponse>(reponseModel);
    }

    async uploadImages(id, images) {
        try {
            return await this.rapportRepository.update(id, {images});
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async createRapport(rapportDto: rapportDto) {
        try {
            const rapport = await this.rapportRepository.create(rapportDto);
            await this.reservationRepository.update(rapportDto.reservationId, {rapportId: rapport._id});
            return rapport;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateRapport(rapportDto: rapportDto, id: any) {
        try {
            return await this.rapportRepository.update(id, {etat: rapportDto.etat});
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getSimpleRapportById(id: any) {
        try {
            return await this.rapportRepository.findById(id);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getRapportById(id: any) {
        try {
            const rapport = await this.rapportModel
                .findById(id)
                .populate('clientId', {fullName: 1, adresse: 1, ville: 1, tel: 1, img: 1})
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
                  $set: {etat: status}
              }
          );
      } catch (error) {
          return new InternalServerErrorException(error);
      }
  }

    async fetchRapports(filterRapportDto: filterRapportDto, group: any) {
        try {
            const aggregate_options: any[] = [
                {
                    $lookup: {from: 'experts', localField: 'expertId', foreignField: '_id', as: 'expert'}
                },
                {
                    $lookup: {from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client'}
                },
                {
                    $lookup: {from: 'reservations', localField: 'reservationId', foreignField: '_id', as: 'reservation'}
                },
                {
                    $lookup: {from: 'reponses', localField: 'reponses', foreignField: '_id', as: 'reponses'}
                },
                {
                    $addFields: {
                        _id: {$toString: '$_id'},
                        expertId: {$toString: '$expertId'},
                        clientId: {$toString: '$clientId'}
                    }
                }
            ];
            if (group !== 'false' && parseInt(group) !== 0) {
                const group = {
                    _id: {$dateToString: {format: '%Y-%m-%d', date: '$date'}}, // Group By Expression
                    data: {$push: '$$ROOT'}
                };

                aggregate_options.push({$group: group});
            }
            return await this.rapportRepository.aggregate(filterRapportDto, aggregate_options);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    /////////Question Category
    async createQuestionCategory(questionCategoryDto: questionCategoryDto) {
        try {
            return await this.questionCategoryRepository.create(questionCategoryDto);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateQuestionCategory(questionCategoryDto: questionCategoryDto, id: any) {
        try {
            return await this.questionCategoryRepository.update(id, {
                category_name: questionCategoryDto.category_name,
                priority: questionCategoryDto.priority
            });
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async findQuestionCategoryById(id: any) {
        try {
            return await this.questionCategoryRepository.findById(id);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteQuestionCategoryById(id: any) {
        try {
            await this.questionCategoryRepository.delete(id);
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
            await this.questionCategoryRepository.deleteManyByIds(ids);
            await this.questionCategoryModel.deleteMany({_id: {$in: ids.ids}});
            return 'Questions categories deleted';
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async fetchQuestionCategoriesPaginate(filterQuestionCtgDto: FilterQuestionCtgDto) {
        try {
            return await this.questionCategoryRepository.aggregate(filterQuestionCtgDto, [{
                $addFields: {
                    _id: {$toString: '$_id'}
                }
            }]);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    ////////CRUD Reponse/////
    async createReponse(reponseDto: reponseDto, expertId: string) {
        try {
            const sess = await this.rapportModel.db.startSession();
            sess.startTransaction();
            const rapport = await this.rapportModel.findById(reponseDto.rapportId, null, {session: sess});
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

            if (response) return this.updateReponse({...reponseDto, color}, response._id);

            const newRespone = new this.reponseModel({...reponseDto, color});
            await newRespone.save({session: sess});
            rapport.reponses.push(newRespone);
            await rapport.save({session: sess});
            await sess.commitTransaction();
            return newRespone;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

  async updateReponse(reponseDto: reponseDto, id: any) {
      try {
          return await this.reponseRepository.update(id, {
              category_name: reponseDto.category_name,
              questionId: reponseDto.questionId,
              reponse: reponseDto.reponse,
              color: reponseDto.color ?? 'black',
              comment: reponseDto.comment
          });
      } catch (error) {
          throw new InternalServerErrorException(error);
      }
  }

    async findReponseById(id: any) {
        try {
            return this.reponseRepository.findById(id);
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
            await question.save({session: sess});
            questionCategory.questions.push(question);
            await questionCategory.save({session: sess});
            await sess.commitTransaction();
            return question;
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

  async updateQuestion(questionDto: questionDto, id: any) {
      try {
          return await this.questionRepository.update(id, {
              question: questionDto.question,
              choices: questionDto.choices,
              colors: questionDto.colors,
              typeInput: questionDto.typeInput
          });
      } catch (error) {
          return new InternalServerErrorException(error);
      }
  }

  async findQuestionById(id: any) {
      try {
          return this.questionRepository.findById(id);
      } catch (error) {
          return new InternalServerErrorException(error);
      }
  }

  async deleteQuestionById(id: any) {
      try {
          return await this.questionRepository.delete(id);
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
            await this.questionRepository.deleteManyByIds(ids);
            return 'Questions deleted';
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async fetchQuestionsPaginate(filterQuestionCtgDto: FilterQuestionDto, categoryId: any) {
        try {
            return await this.questionRepository.aggregate(filterQuestionCtgDto, [{
                $addFields: {
                    _id: {$toString: '$_id'}
                }
            }]);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    ///Create ReponsesForCategory
    async createReponsesForCategory(responsesCategoryDto: reponsesCategoryDto, rapportId: any, done: any) {
        try {
            let createdReponse;
            if (done === 'true') {
                const rapport = await this.rapportModel.findById(rapportId).populate('expertId', {
                    fullName: 1,
                    signature: 1
                });
                const job = await this.pdfQueue.add('transcode', {
                    idRapport: rapportId,
                    expertId: rapport.expertId
                });

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
