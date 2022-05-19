import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthorizationHandler, AppLayout } from 'components';

import {
  Home,
  Dashboard,
  EditProfile,
  Users,
  Statement,
  Testimonials,
  Deposit,
  Games,
  Bets,
  Rules,
  FAQ,
  ResetPassword,
  Listbanks,
} from 'routes';
import NewBingo from './routes/Games/components/NewBingo';

const AuthorizedRoutes = () => (
  <AuthorizationHandler>
    {/* Here are the routes that should be protected by authentication */}
    <AppLayout>
      <Switch>
        {/* Menu */}
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/jogos" component={Games} />
        <Route exact path="/apostas" component={Bets} />
        <Route exact path="/usuarios" component={Users} />
        <Route exact path="/extrato" component={Statement} />
        <Route exact path="/depoimentos" component={Testimonials} />
        <Route exact path="/depositar" component={Deposit} />
        <Route exact path="/regras" component={Rules} />
        <Route exact path="/faq" component={FAQ} />

        {/* Out from menu */}
        <Route exact path="/editprofile" component={EditProfile} />
        <Route exact path="/bolao" component={NewBingo} />
        <Route exact path="/bancosbrasileiros" component={Listbanks} />
      </Switch>
    </AppLayout>
  </AuthorizationHandler>

);
const AllRoutes = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/reset-password" component={ResetPassword} />
      {/* Put here your public component screens */}
      <Route path="*" component={AuthorizedRoutes} />
    </Switch>
  </>
);

export default AllRoutes;
