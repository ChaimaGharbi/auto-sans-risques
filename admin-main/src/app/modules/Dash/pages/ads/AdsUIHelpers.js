export const AdStatusCssClasses = ["info", "success", "danger", ""];
export const AdStatusTitles = ["EnAttente", "Active", "Banni(e)", ""];
export const AdAccStatusTitles = ["Non vérifié", "vérifié", "", ""];
export const AdTypeCssClasses = ["success", "primary", ""];
export const AdTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "createdAt", order: "desc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 },
];
export const initialFilter = {
  filter: {
    _id: "",
  },
  sortOrder: "desc", // asc||desc
  sortField: "default",
  pageNumber: 1,
  pageSize: 10,
};
