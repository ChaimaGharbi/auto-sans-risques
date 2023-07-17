import {Body, Controller, Get, Param, Post, Put, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Role} from 'src/entities/user.roles.enum';
import {Roles} from '../auth/role.decorator';
import {RolesGuard} from '../auth/roles.guard';
import {RapportService} from '../rapport/rapport.service';
import {filterReservationDto} from './dto/filterReservation.dto';
import {reservationDto} from './dto/reservation.dto';
import {ReservationService} from './reservation.service';
import {ReservationGateway} from './reservation.gateway';
import {getSocketId} from 'src/shared/redis';

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService, private reservationGateway: ReservationGateway) {
    }

    @Post('/')
    //!
    // @Roles(Role.USER)
    // @UseGuards(AuthGuard(), RolesGuard)
    async createReservation(@Body(ValidationPipe) reservationDto: reservationDto) {
        const reservation = await this.reservationService.createReservation(reservationDto, async payload => {
            const socketId = await getSocketId(payload.receiver);
            if (!socketId) return;
            this.reservationGateway.server.to(socketId).emit('api', {
                event: 'RESERVATION_CREATED',
                data: payload
            });
        });
        return reservation;
    }

    @Post('/paginate')
    async fetchReservationsPaginate(@Body(ValidationPipe) filterReservationDto: filterReservationDto) {
        return await this.reservationService.fetchReservationsPaginate(filterReservationDto, false);
    }

    @Get('/:id')
    // @Roles(Role.EXPERT)
    @UseGuards(AuthGuard(), RolesGuard)
    async fetchReservationById(@Param() params, @Request() req) {
        const id = req.user._id?.toString();
        return await this.reservationService.fetchReservationById(params.id, id);
    }

    @Put('/updateStatus/:id/:status')
    // @Roles(Role.EXPERT)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateReservationStatus(@Param() params, @Request() req) {
        return await this.reservationService.updateReservationStatus(
            params.id.toString(),
            req.user._id.toString(),
            params.status,
            async payload => {
                const socketId = await getSocketId(payload.receiver);
                if (!socketId) return;
                this.reservationGateway.server.to(socketId).emit('api', {
                    event: 'RESERVATION_STATUS_UPDATED',
                    data: payload
                });
            }
        );
    }

    @Put('/state/ids')
    async updateReservationsStatusByIds(@Body() body) {
        return await this.reservationService.updateReservationsStatusByIds(body.ids, body.etat);
    }
}
