import {IsBoolean, IsMongoId, IsString} from 'class-validator';

export class NotificationDto {
    @IsString()
    message: string;

    @IsBoolean()
    is_read: boolean;

    @IsMongoId()
    senderId: any;

    @IsMongoId()
    receiverId: any;

    @IsMongoId()
    reservationId: any;
}
