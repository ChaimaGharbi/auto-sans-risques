export class FilterArticleDto {
    filter: {
        _id: any;
        title: any;
    };
    pageNumber: number;
    pageSize: number;
    sortField: any;
    sortOrder: any;
}
