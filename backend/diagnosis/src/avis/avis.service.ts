import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {avisDto} from './dto/avis.dto';
import {FilterAvisDto} from './dto/filterAvis.dto';
import {uploadImage} from "../shared/upload.files";
import {Model, Types} from "mongoose";
import {GenericRepository} from "../shared/generic/generic.repository";
import {InjectModel} from "@nestjs/mongoose";
import {Avis} from "./entities/avis.entity";
import {ImageAvis} from "./entities/image_avis.entity";
import {Expert} from "../reservation/entities/expert.entity";
import {IAvisModel} from "./entities/avis.interface";
import avisSort from "./avis-sort";

@Injectable()
export class AvisService {
    private readonly avisRepository: GenericRepository<Avis>
    private readonly imageRepository: GenericRepository<ImageAvis>
    private readonly expertRepository: GenericRepository<Expert>

    constructor(
        @InjectModel(Avis.name) private readonly avisModel: IAvisModel,
        @InjectModel(ImageAvis.name) private readonly imageModel: Model<ImageAvis>,
        @InjectModel(Expert.name) private readonly expertModel: Model<Expert>,
    ) {
        this.avisRepository = new GenericRepository(avisModel);
        this.imageRepository = new GenericRepository(imageModel);
        this.expertRepository = new GenericRepository(expertModel);
    }

    async createAvis(avisDto: avisDto, images: any) {
        try {
            const sess = await this.avisModel.db.startSession();
            sess.startTransaction();
            const avis = new this.avisModel(avisDto);
            for (let i = 0; i < images?.length; i++) {
                const file = images[i];
                const imageUrl = uploadImage(file);
                const AvisImage = new this.imageModel({
                    imageUrl,
                    avisId: avis._id
                });
                await AvisImage.save({session: sess});
                avis.images.push(AvisImage);
            }
            const newAvis = await avis.save({session: sess});
            await sess.commitTransaction();
            const result = await this.avisModel.aggregate([
                {$match: {expertId: Types.ObjectId(avisDto.expertId)}},
                {$group: {_id: null, note: {$avg: '$note'}}}
            ]);
            await this.expertRepository.update(avisDto.expertId, {note: Math.round(result[0].note)});
            return await this.avisModel.findById(newAvis._id).populate('clientId', {fullName: 1, _id: 1, img: 1});
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async fetchAvisById(id: any) {
        try {
            const avis = await this.avisModel
                .findById(id)
                .populate('images')
                .populate('clientId', {fullName: 1})
                .populate('expertId', {fullName: 1});
            if (!avis) {
                return new NotFoundException('Pas des avis');
            }
            return avis;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteAvisByIds(ids: any) {
        try {
            await this.avisRepository.deleteManyByIds(ids);
            return 'avis deleted';
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async fetchAvisByExpertId(expertId: any, limit: number) {
        try {
            const avis = await this.avisModel
                .find({expertId: Types.ObjectId(expertId)})
                .populate('images', {imageUrl: 1})
                .populate('clientId', {fullName: 1, img: 1})
                .limit(limit)
                .sort({date: -1});

            const NumAvis = await this.avisModel.find({expertId: Types.ObjectId(expertId)}).countDocuments();
            return {
                avis,
                NumAvis
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async fetchAvisByClientId(clientId: any) {
        try {
            const avis = await this.avisModel.find({clientId: Types.ObjectId(clientId)}).populate('images');
            if (!avis || avis.length === 0) {
                return new NotFoundException('Pas des avis pour cette user');
            }
            return avis;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateAvis(avisDto: avisDto, images: any, avisId: any) {
        try {
            const avis = await this.avisModel.findById(avisId);
            if (!avis) {
                return new NotFoundException('Pas de avis trouvée pour cette userId');
            }
            const sess = await this.avisModel.db.startSession();
            sess.startTransaction();
            avis.commentaire = avisDto.commentaire;
            avis.note = avisDto.note;
            await avis.save({session: sess});
            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                const imageUrl = await uploadImage(file);
                const AvisImage = new this.imageModel({
                    imageUrl,
                    avisId: avis._id
                });
                await AvisImage.save({session: sess});
                avis.images.push(AvisImage);
            }
            await avis.save({session: sess});
            await sess.commitTransaction();

            return avis;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteAvis(avisId: any) {
        try {
            const avis = await this.avisModel.findById(avisId);
            if (!avis) {
                return new NotFoundException('Pas de avis trouvée pour cette userId');
            }
            await this.avisModel.deleteOne({_id: avisId});
            await this.imageModel.deleteMany({avisId: Types.ObjectId(avisId)});
            return 'success';
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteImageAvis(imageId: any) {
        try {
            const image = await this.imageModel.findById(imageId);
            if (!image) {
                return new NotFoundException('Pas de image trouvée');
            }
            await this.imageModel.deleteOne({_id: imageId});
            return 'success';
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async fetchAvisPaginate(filterAvisDto: FilterAvisDto) {
        try {
            return await this.avisRepository.aggregate(filterAvisDto, avisSort)
            //LOOKUP/JOIN -- FOURTH STAGE
            // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }
}
