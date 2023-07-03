export {}
// export function findExperts(queryParams) {
//
//     return axios.post(`${config.API_URL}/expert/paginate?group=false`, JSON.stringify(queryParams));
//   }

//   export function addReviewToExpert(review,note,images,clientId,expertId) {
//     let formData = new FormData();
//     formData.append("commentaire", review);
//     formData.append("note", note);
//     Array.from(images).forEach((file) => {
//       formData.append('images[]', file);
//     });
//     formData.append("clientId", clientId);
//     formData.append("expertId", expertId);

//     return axios.post(`${config.API_URL}/avis`, formData, {
//       headers: { "content-type": "multipart/form-data" },
//     });
//   }

//   export function CreateReservation(reservation) {
//     return axios.post(`${config.API_URL}/reservation`, JSON.stringify(reservation));
//   }

//   export function findReservations(queryParams) {
//     return axios.post(`${config.API_URL}/reservation/paginate?group=false`, JSON.stringify(queryParams));
//   }

// export const fetchExperts = (queryParams) => (dispatch) => {
//     dispatch(actions.startCall({ callType: callTypes.list }));
//     return requestFromServer
//       .findExperts(queryParams)
//       .then((response) => {
//         const { totalCount, totalPages, limit, page, entities } = response.data;
//         dispatch(
//           actions.expertsFetched({
//             totalCount,
//             totalPages,
//             limit,
//             page,
//             entities,
//           })
//         );
//       })
//       .catch((error) => {
//
//         error.clientMessage = "Can't find experts";
//         dispatch(actions.catchError({ error, callType: callTypes.list }));
//       });
//   };

// export function findExperts(queryParams) {
//
//     return axios.post(`${config.API_URL}/expert/paginate?group=false`, JSON.stringify(queryParams));
//   }

//   export function getExpertById(id) {
//     return axios.get(`${config.API_URL}/expert/${id}`);
//   }

//   export function getReviewsByExpertId(id,limit) {
//     return axios.get(`${config.API_URL}/avis/expert/${id}/${limit}`);
//   }

//   export function addReviewToExpert(review,note,images,clientId,expertId) {
//     let formData = new FormData();
//     formData.append("commentaire", review);
//     formData.append("note", note);
//     Array.from(images).forEach((file) => {
//       formData.append('images[]', file);
//     });
//     formData.append("clientId", clientId);
//     formData.append("expertId", expertId);

//     return axios.post(`${config.API_URL}/avis`, formData, {
//       headers: { "content-type": "multipart/form-data" },
//     });
//   }

//   export function CreateReservation(reservation) {
//     return axios.post(`${config.API_URL}/reservation`, JSON.stringify(reservation));
//   }

//   export function findReservations(queryParams) {
//     return axios.post(`${config.API_URL}/reservation/paginate?group=false`, JSON.stringify(queryParams));
//   }
