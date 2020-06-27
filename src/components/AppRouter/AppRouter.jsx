import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Quiz from '../../pages/Quiz/Quiz';
import Results from '../../pages/Results/Results';

const history = createBrowserHistory();

const AppRouter = () => {
    return (
        <Router history={history}>
          <Switch>
              <Route
                key={1}
                path="/quiz"
                component={Quiz}
              />
              <Route
                key={2}
                path="/results"
                component={Results}
              />
         </Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect exact from="/" to="/quiz" />}
          />
        </Router>
    );
}

export default AppRouter;