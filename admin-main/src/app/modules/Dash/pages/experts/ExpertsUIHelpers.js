export const ExpertStatusCssClasses = ["info", "success", "danger", ""];
export const ExpertStatusTitles = ["EnAttente", "Active", "Banni(e)", ""];
export const ExpertAccStatusTitles = ["Non vérifié", "vérifié", "", ""];
export const ExpertTypeCssClasses = ["success", "primary", ""];
export const ExpertTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "createdAt", order: "desc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 },
];
export const initialFilter = {
  filter: {
    email: "",
    address: "",
    fullName: "",
    tel: "",
    isActive: "",
    specialite: "",
  },
  specialite: {
    specialitiesModels: [],
  },
  sortOrder: "desc", // asc||desc
  sortField: "createdAt",
  pageNumber: 1,
  pageSize: 10,
};
