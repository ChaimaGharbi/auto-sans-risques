export const defaultSorted = [{ dataField: "priority", order: "asc" }];
export const sizePerPageList = [
  { text: "1", value: 1 },
  { text: "3", value: 3 },
  { text: "5", value: 5 },
];
export const initialFilter = {
  filter: {
    title: "",
    _id: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "priority",
  pageNumber: 1,
  pageSize: 10,
};
