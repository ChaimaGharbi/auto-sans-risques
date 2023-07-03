export const AssistanceStatusCssClasses = ["info", "success"];
export const AssistanceStatusTitles = ["EN_ATTENTE", "CONTACTE"];
export const AssistanceTypeCssClasses = ["success", "primary", ""];
export const AssistanceTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "date", order: "desc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    clientId: "",
    expertId: ""
  },
  sortOrder: "desc", // asc||desc
  sortField: "date",
  pageNumber: 1,
  pageSize: 10
};
