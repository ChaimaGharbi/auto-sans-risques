export const ClientStatusCssClasses = ["", "success", "danger"];
export const ClientStatusTitles = ["", "Active", "Banni(e)"];
export const ClientAccStatusTitles = ["Non vérifié", "vérifié", "", ""];
export const ClientAccStatusCssClasses = ["danger", "success", ""];
export const ClientTypeCssClasses = ["success", "primary", ""];
export const ClientTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "createdAt", order: "desc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    email: "",
    specialite: "",
    address: "",
    fullName: "",
    tel: "",
    isActive: ""
  },
  sortOrder: "desc", // asc||desc
  sortField: "createdAt",
  pageNumber: 1,
  pageSize: 10
};
