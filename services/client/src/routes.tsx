import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Dashboard } from './components/Dashboard';

export const Routes = () => <Switch>
    <Route path="/" component={Dashboard}/>
</Switch>;

export default Routes;
