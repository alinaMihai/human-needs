import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Quiz from '../../pages/Quiz/Quiz';
import Results from '../../pages/Results/Results';

const AppRouter = ({children}) => {
    return (
        <BrowserRouter>
          <Switch>
              <Route
                key={1}
                exact path={["/","/quiz"]}
                component={Quiz}
              />
              <Route
                key={2}
                exact
                path={["/results"]}
                component={Results}
              />
         </Switch>
         {children}
        </BrowserRouter>
    );
}

export default AppRouter;