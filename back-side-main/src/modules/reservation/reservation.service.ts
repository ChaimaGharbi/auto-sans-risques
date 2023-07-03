import { Injectable } from '@nestjs/common';
import { ReservationStatus } from 'src/entities/reservation.status.enum';
import { ReservationRepository } from 'src/repositories/reservation.repository';
import { filterReservationDto } from './dto/filterReservation.dto';
import { reservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private reservationRepository: ReservationRepository) {}

  createReservation(reservationDto: reservationDto, cb: (payload: any) => void) {
    return this.reservationRepository.createReservation(reservationDto, cb);
  }

  fetchReservationsPaginate(filterReservationDto: filterReservationDto, group: any) {
    return this.reservationRepository.fetchReservationsPaginate(filterReservationDto, group);
  }

  updateReservationStatus(id: any, expertId: any, status: ReservationStatus, cb: (payload: any) => void) {
    return this.reservationRepository.updateReservationStatus(id, expertId, status, cb);
  }

  updateReservationsStatusByIds(ids: string[], etat: string) {
    return this.reservationRepository.updateReservationsStatusByIds(ids, etat);
  }

  fetchReservationById(id: any, expertId: string) {
    return this.reservationRepository.fetchReservationById(id, expertId);
  }
}
