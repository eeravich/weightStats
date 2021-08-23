import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import ChartModule from './chart.jsx';
import ListModule from './list.jsx';

export const Modules = () => {
    return (
        <Switch>
            <Route path="/list" component={ListModule} />
            <Route path="/" component={ChartModule} />
        </Switch>
    );
};

export default withRouter(Modules);
