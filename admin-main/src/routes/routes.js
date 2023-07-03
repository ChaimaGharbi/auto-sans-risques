import {
  PATH_ORIGIN,
  PATH_LOGIN,
  PATH_DASHBOARD,
  PATH_ARTICLES,
  PATH_MARKS,
  PATH_CATEGORIES_ADD,
  PATH_MARKS_ADD,
  PATH_QUESTIONS_RAPPORT,
  PATH_EXPERTS,
  PATH_MODERATORS,
  PATH_RAPPORST,
  PATH_RECLAMATIONS,
  PATH_ASSISTANCES,
  PATH_PACKS,
  PATH_ADS,
  PATH_AVIS,
  PATH_CLIENTS,
  PATH_RESERVATIONS,
  PATH_QUESTIONS,
  PATH_FORGOT_PASSWORD,
  PATH_RESET_PAGE,
  PATH_REGISTRATION,
} from "./paths";
import { DashboardPage1 } from "../app/pages/DashboardPage";
import { CategoriesPage } from "../app/modules/Dash/pages/articles/articles/CategoriesPage";
import { CategoryEdit } from "../app/modules/Dash/pages/articles/articles/category-edit/CategoryEdit";
import { MarkEdit } from "../app/modules/Dash/pages/marks/mark-edit/MarkEdit";
import { RapportcategoryEdit } from "../app/modules/Dash/pages/questions_rapport/rapportcategory-edit/RapportcategoryEdit";
import { ExpertsPage } from "../app/modules/Dash/pages/experts/ExpertsPage";
import { ModeratorsPage } from "../app/modules/Dash/pages/moderators/ModeratorsPage";
import { RapportsPage } from "../app/modules/Dash/pages/rapports/RapportsPage";
import { ReclamationsPage } from "../app/modules/Dash/pages/reclamations/ReclamationsPage";
import { AssistancesPage } from "../app/modules/Dash/pages/assistances/AssistancesPage";
import { PacksPage } from "../app/modules/Dash/pages/packs/PacksPage";
import { AdsPage } from "../app/modules/Dash/pages/ads/AdsPage";
import { AvisPage } from "../app/modules/Dash/pages/avis/AvisPage";
import { ClientsPage } from "../app/modules/Dash/pages/clients/ClientsPage";
import { ReservationsPage } from "../app/modules/Dash/pages/reservations/ReservationsPage";
import { RapportcategoriesPage } from "../app/modules/Dash/pages/questions_rapport/RapportcategoriesPage";
import { MarksPage } from "../app/modules/Dash/pages/marks/MarksPage";
import Registration from "../app/modules/Auth/pages/Registration";
import ForgotPassword from "../app/modules/Auth/pages/ForgotPassword";
import Login from "../app/modules/Auth/pages/Login";
import withAuth, { allowRoles } from "../HOCs/withAuth";
import { has } from "object-path";
import ResetPage from "../app/modules/Auth/pages/ResetPage";
export const routes = ({ allows, role }) => {
  //const allow = role == "ADMIN" || false;
  let isAdmin;
  let allow = {};
  if (role == "ADMIN") {
    isAdmin = true;
  } else {
    isAdmin = false;
    if (has(allows, "menus") && has(allows, "configs")) {
      allow = { ...allows.menus, ...allows.configs };
    }
  }
  
  return {
    outLayout: [
      {
        path: PATH_LOGIN,
        component: Login,
      },
      {
        path: PATH_REGISTRATION,
        component: Registration,
      },
      {
        path: PATH_FORGOT_PASSWORD,
        component: ForgotPassword,
      },
      {
        path: PATH_RESET_PAGE,
        component: ResetPage,
      },
    ],
    inLayout: [
      {
        path: PATH_DASHBOARD,
        component: allowRoles(DashboardPage1, isAdmin || allow?.dash),
      },
      {
        path: PATH_ARTICLES,
        component: allowRoles(CategoriesPage, isAdmin || allow?.articles),
      },
      {
        path: PATH_MARKS,
        component: allowRoles(MarksPage, isAdmin || allow?.marks),
      },
      {
        path: PATH_CATEGORIES_ADD,
        component: allowRoles(CategoryEdit, isAdmin || allow?.articles),
      },
      {
        path: PATH_MARKS_ADD,
        component: allowRoles(MarkEdit, isAdmin || allow?.marks),
      },
      {
        path: PATH_QUESTIONS_RAPPORT,
        component: allowRoles(RapportcategoryEdit, isAdmin || allow?.rapport),
      },
      {
        path: PATH_QUESTIONS,
        component: allowRoles(RapportcategoriesPage, isAdmin || allow?.rapport),
      },
      {
        path: PATH_EXPERTS,
        component: allowRoles(ExpertsPage, isAdmin || allow?.experts),
      },
      {
        path: PATH_MODERATORS,
        component: allowRoles(ModeratorsPage, isAdmin),
      },
      {
        path: PATH_RAPPORST,
        component: allowRoles(RapportsPage, isAdmin || allow?.rapports),
      },
      {
        path: PATH_RECLAMATIONS,
        component: allowRoles(ReclamationsPage, isAdmin || allow?.reclama),
      },
      {
        path: PATH_ASSISTANCES,
        component: allowRoles(AssistancesPage, isAdmin || allow?.assist),
      },
      {
        path: PATH_PACKS,
        component: allowRoles(PacksPage, isAdmin || allow?.packs),
      },
      {
        path: PATH_ADS,
        component: allowRoles(AdsPage, isAdmin || allow?.ads),
      },
      {
        path: PATH_AVIS,
        component: allowRoles(AvisPage, isAdmin || allow?.avis),
      },
      {
        path: PATH_CLIENTS,
        component: allowRoles(ClientsPage, isAdmin || allow?.clients),
      },
      {
        path: PATH_RESERVATIONS,
        component: allowRoles(ReservationsPage, isAdmin || allow?.missions),
      },
    ],
  };
};
