import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { dashboardSlice } from "../app/modules/Dash/_redux/dashboard/dashboardSlice";

import { articlesSlice } from "../app/modules/Dash/_redux/articles/articlesSlice";
import { categoriesSlice } from "../app/modules/Dash/_redux/categories/categoriesSlice";
import { marksSlice } from "../app/modules/Dash/_redux/marks/marksSlice";
import { modelsSlice } from "../app/modules/Dash/_redux/models/modelsSlice";
import { questionsSlice } from "../app/modules/Dash/_redux/questions/questionsSlice";
import { rapportcategoriesSlice } from "../app/modules/Dash/_redux/rapportcategories/rapportcategoriesSlice";
import { expertsSlice } from "../app/modules/Dash/_redux/experts/expertsSlice";
import { rapportsSlice } from "../app/modules/Dash/_redux/rapports/rapportsSlice";
import { reclamationsSlice } from "../app/modules/Dash/_redux/reclamations/reclamationsSlice";
import { assistancesSlice } from "../app/modules/Dash/_redux/assistances/assistancesSlice";
import { packsSlice } from "../app/modules/Dash/_redux/packs/packsSlice";
import { adsSlice } from "../app/modules/Dash/_redux/ads/adsSlice";
import { avisSlice } from "../app/modules/Dash/_redux/avis/avisSlice";
import { clientsSlice } from "../app/modules/Dash/_redux/clients/clientsSlice";
import { reservationsSlice } from "../app/modules/Dash/_redux/reservations/reservationsSlice";
import { moderatorsSlice } from "../app/modules/Dash/_redux/moderators/moderatorsSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,

  dashboard: dashboardSlice.reducer,

  experts: expertsSlice.reducer,
  articles: articlesSlice.reducer,
  categories: categoriesSlice.reducer,
  questions: questionsSlice.reducer,
  rapportcategories: rapportcategoriesSlice.reducer,
  rapports: rapportsSlice.reducer,
  reclamations: reclamationsSlice.reducer,
  assistances: assistancesSlice.reducer,
  packs: packsSlice.reducer,
  ads: adsSlice.reducer,
  avis: avisSlice.reducer,
  clients: clientsSlice.reducer,
  reservations: reservationsSlice.reducer,
  marks: marksSlice.reducer,
  models: modelsSlice.reducer,
  moderators: moderatorsSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
