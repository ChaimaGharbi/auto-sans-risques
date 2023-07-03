export const PackStatusCssClasses = ["info", "success", "danger", ""];
export const PackStatusTitles = ["EnAttente", "Active", "Banni(e)", ""];
export const PackAccStatusTitles = ["Non vérifié", "vérifié", "", ""];
export const PackTypeCssClasses = ["success", "primary", ""];
export const PackTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "createdAt", order: "desc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    _id: "",
  },
  sortOrder: "desc", // asc||desc
  sortField: "priority",
  pageNumber: 1,
  pageSize: 10
};
