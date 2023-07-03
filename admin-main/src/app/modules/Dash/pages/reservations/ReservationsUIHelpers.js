export const ReservationStatusCssClasses = ["info", "success", "danger", "success"];
export const ReservationStatusTitles = ["EN_ATTENTE", "ACCEPTEE", "REFUSEE", "COMPLETEE"];
export const ReservationTypeCssClasses = ["success", "primary", ""];
export const ReservationTypeTitles = ["Business", "Individual", ""];
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
