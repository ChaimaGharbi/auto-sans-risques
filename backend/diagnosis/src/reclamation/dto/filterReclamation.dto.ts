export class FilterReclamationDto {
    filter: {
        _id: any;
        fullName: any;
        reservationId: any;
        email: any;
        etat: any;
        clientId: any;
    };
    pageNumber: number;
    pageSize: number;
    sortField: any;
    sortOrder: any;
}
