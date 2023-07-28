export class FilterPaymentDto {
  filter: {
    _id: any;
    etat: any;
    expertId: any;
  };
  pageNumber: number;
  pageSize: number;
  sortField: any;
  sortOrder: any;
}