export class filterModeratorDto {
    filter: {
        _id?: any;
        email?: any;
        fullName?: any;
    };
    pageNumber: number;
    pageSize: number;
    sortField: any;
    sortOrder: any;
}
