import * as React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RegisterConnector } from '../modules/register/RegisterConnector';
import { LoginConnector } from '../modules/login/LoginConnector';
import { ForgotPasswordConnector } from '../modules/forgotPassword/ForgotPasswordConnector';
import { FourOhFour } from '../modules/shared/FourOhFour';
import { LogoutConnector } from '../modules/logout/LogoutConnector';

import { adminRoutes } from './adminRoutes';

const mapRoutes = (routes: any[]): any => {
  return routes.map((route: any) => {
    if (!route.children) {
      return (
        <Route
          exact={ route.exact }
          path={ route.path }
          component={ route.component }
          key={ route.path }
        />
      );
    }

    return mapRoutes(route.children);
  });
}

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={ RegisterConnector } />
      <Route exact={true} path="/login" component={ LoginConnector } />
      <Route exact={true} path="/logout" component={ LogoutConnector } />
      <Route exact={true} path="/forgotPassword" component={ ForgotPasswordConnector } />
      {mapRoutes(adminRoutes)}
      <Route component={ FourOhFour } />
    </Switch>
  </BrowserRouter>
);
