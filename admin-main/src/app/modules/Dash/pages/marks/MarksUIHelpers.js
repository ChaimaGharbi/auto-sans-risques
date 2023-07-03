export const CategoryStatusCssClasses = ["info", "success", "danger", ""];
export const CategoryStatusTitles = ["Pending", "Sent", "Rejected", ""];
export const CategoryTypeCssClasses = ["success", "primary", ""];
export const CategoryTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "name", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 },
];
export const initialFilter = {
  filter: {
    name: "",
    _id: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "name",
  pageNumber: 1,
  pageSize: 10,
};
