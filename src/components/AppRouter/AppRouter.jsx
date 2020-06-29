import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Quiz from '../../pages/Quiz/Quiz';
import Results from '../../pages/Results/Results';

const history = createBrowserHistory();

const AppRouter = () => {
    return (
        <Router history={history}>
          <Switch>
              <Route
                exact path={["/","/quiz"]}
                key={1}
                component={Quiz}
              />
              <Route
                key={2}
                path="/results"
                component={Results}
              />
         </Switch>
        </Router>
    );
}

export default AppRouter;