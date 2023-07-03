export class FilterQuestionDto {
  filter: {
    _id: any;
    question: any;
  };
  pageNumber: number;
  pageSize: number;
  sortField: any;
  sortOrder: any;
}
