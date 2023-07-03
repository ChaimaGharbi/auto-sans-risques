import React, { Suspense, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { connect, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthPage } from "../app/modules/Auth";
import { Layout, LayoutSplashScreen } from "../_metronic/layout";
import { Route, Switch, Redirect } from "react-router-dom";

/* export default (ComposedComponent) => (props) => {
  const history = useHistory();
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );
  //const auth = useSelector((state) => state.auth, shallowEqual)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    alert(window.location.pathname);
    if (isAuthorized) {
      setLoading(false);
    }
  }, [isAuthorized]);

  if (loading) {
    return null;
  } else {
    return !isAuthorized ? (
      <>
        <Route>
          <AuthPage>
            <ComposedComponent {...props} />
            <Redirect from="/auth" exact={true} to="/auth/login" />
            <Redirect to="/auth/login" />
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
            <ComposedComponent {...props} />
          </Suspense>
        </Layout>
      </>
    );
    return <ComposedComponent {...props} />;
  }
}; */

export const allowRoles = (ComposedComponent, allow) => (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user, shallowEqual);

  if (allow) {
    return <ComposedComponent {...props} />;
  } else {
    return <Redirect exact from="/" to="/dashboard" />;
  }
};
