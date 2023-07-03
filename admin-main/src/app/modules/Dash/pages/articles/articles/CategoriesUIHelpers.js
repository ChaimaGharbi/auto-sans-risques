export const CategoryStatusCssClasses = ["info", "success", "danger", ""];
export const CategoryStatusTitles = ["Pending", "Sent", "Rejected", ""];
export const CategoryTypeCssClasses = ["success", "primary", ""];
export const CategoryTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "priority", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 },
];
export const initialFilter = {
  filter: {
    category_name: "",
    _id: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "priority",
  pageNumber: 1,
  pageSize: 10,
};
