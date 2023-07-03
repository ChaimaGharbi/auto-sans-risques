export const AvisStatusCssClasses = ["info", "warning", "success"];
export const AvisStatusTitles = ["EN_ATTENTE", "EN_COURS", "RESOLU"];
export const AvisTypeCssClasses = ["success", "primary", ""];
export const AvisTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "date", order: "desc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    expertId: "",
    clientId: "",
  },
  sortOrder: "desc", // asc||desc
  sortField: "date",
  pageNumber: 1,
  pageSize: 10
};
