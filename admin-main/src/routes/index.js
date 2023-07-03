import React, { Suspense } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthPage, Logout } from "../app/modules/Auth";
import ErrorsPage from "../app/modules/ErrorsExamples/ErrorsPage";
import { ContentRoute, Layout, LayoutSplashScreen } from "../_metronic/layout";
import { routes } from "./routes";

export default () => {
  const { isAuthorized, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      user: auth.user,
    }),
    shallowEqual
  );
  return (
    <Switch>
      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />
      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <>
          <Route>
            <AuthPage>
              {routes({
                allows: user?.allows,
                role: user?.roles,
              })?.outLayout.map((val, key) => (
                <ContentRoute {...val} key={key} />
              ))}
              <Redirect from="/auth" exact={true} to="/auth/login" />
              {/* <Redirect to="/auth/login" /> */}
            </AuthPage>
          </Route>
          <Redirect to="/auth/login" />
        </>
      ) : (
        <>
          <Redirect from="/auth" to="/" />
          <Layout>
            <Suspense fallback={<LayoutSplashScreen />}>
              <Redirect exact from="/" to="/dashboard" />
              {routes({
                allows: user?.allows,
                role: user?.roles,
              })?.inLayout.map((val, key) => (
                <ContentRoute {...val} key={key} />
              ))}
              {/* <Redirect to="/error/error-v1" /> */}
            </Suspense>
          </Layout>
        </>
      )}
    </Switch>
  );
};
