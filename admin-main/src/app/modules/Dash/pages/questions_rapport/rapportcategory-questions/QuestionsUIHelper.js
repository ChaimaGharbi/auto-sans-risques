export const defaultSorted = [{ dataField: "_id", order: "asc" }];
export const sizePerPageList = [
  { text: "1", value: 1 },
  { text: "3", value: 3 },
  { text: "5", value: 5 }
];
export const initialFilter = {
  filter: {
    question: "",
    _id: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "_id",
  pageNumber: 1,
  pageSize: 5
};
