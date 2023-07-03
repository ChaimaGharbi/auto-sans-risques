import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";

import { DashboardPage1 } from "./pages/DashboardPage";

import { CategoriesPage } from "../app/modules/Dash/pages/articles/articles/CategoriesPage";

import { CategoryEdit } from "../app/modules/Dash/pages/articles/articles/category-edit/CategoryEdit";
import { ExpertsPage } from "./modules/Dash/pages/experts/ExpertsPage";
import { RapportcategoriesPage } from "./modules/Dash/pages/questions_rapport/RapportcategoriesPage";
import { RapportcategoryEdit } from "./modules/Dash/pages/questions_rapport/rapportcategory-edit/RapportcategoryEdit";
import { RapportsPage } from "./modules/Dash/pages/rapports/RapportsPage";
import { ReclamationsPage } from "./modules/Dash/pages/reclamations/ReclamationsPage";
import { AssistancesPage } from "./modules/Dash/pages/assistances/AssistancesPage";
import { PacksPage } from "./modules/Dash/pages/packs/PacksPage";
import { AdsPage } from "./modules/Dash/pages/ads/AdsPage";
import { AvisPage } from "./modules/Dash/pages/avis/AvisPage";
import { ClientsPage } from "./modules/Dash/pages/clients/ClientsPage";
import { ReservationsPage } from "./modules/Dash/pages/reservations/ReservationsPage";
import { MarksPage } from "./modules/Dash/pages/marks/MarksPage";
import { MarkEdit } from "./modules/Dash/pages/marks/mark-edit/MarkEdit";
import { ModeratorsPage } from "./modules/Dash/pages/moderators/ModeratorsPage";

export default function BasePage() {
  // useEffect(() => {
  //   
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage1} />

        <ContentRoute path="/dash/articles" component={CategoriesPage} />
        <ContentRoute path="/dash/marques" component={MarksPage} />
        <ContentRoute
          path="/dash/categories/:_id/add"
          component={CategoryEdit}
        />
        <ContentRoute path="/dash/marks/:_id/add" component={MarkEdit} />
        <ContentRoute
          path="/dash/questionsrapport/categories/:_id/add"
          component={RapportcategoryEdit}
        />
        <ContentRoute
          path="/dash/questions"
          component={RapportcategoriesPage}
        />
        <ContentRoute path="/dash/experts" component={ExpertsPage} />
        <ContentRoute path="/dash/moderators" component={ModeratorsPage} />
        <ContentRoute path="/dash/rapports" component={RapportsPage} />
        <ContentRoute path="/dash/reclamations" component={ReclamationsPage} />
        <ContentRoute path="/dash/assistances" component={AssistancesPage} />
        <ContentRoute path="/dash/packs" component={PacksPage} />
        <ContentRoute path="/dash/ads" component={AdsPage} />
        <ContentRoute path="/dash/avis" component={AvisPage} />
        <ContentRoute path="/dash/clients" component={ClientsPage} />
        <ContentRoute path="/dash/reservations" component={ReservationsPage} />

        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
