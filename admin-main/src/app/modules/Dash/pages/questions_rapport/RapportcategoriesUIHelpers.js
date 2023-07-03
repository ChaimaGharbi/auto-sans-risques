export const RapportcategoryStatusCssClasses = ["info", "success", "danger", ""];
export const RapportcategoryStatusTitles = ["Pending", "Sent", "Rejected", ""];
export const RapportcategoryTypeCssClasses = ["success", "primary", ""];
export const RapportcategoryTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "priority", order: "desc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    category_name: "",
    _id: "",
  },
  sortOrder: "desc", // asc||desc
  sortField: "priority",
  pageNumber: 1,
  pageSize: 10
};

