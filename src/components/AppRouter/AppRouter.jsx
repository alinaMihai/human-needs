import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Quiz from '../../pages/Quiz/Quiz';
import Results from '../../pages/Results/Results';
import Page from '../../components/Page/Page';

const AppRouter = ({children}) => {
    return (
        <BrowserRouter>
          <Switch>
              <Route
                key={1}
                exact path={["/","/quiz"]}
                render={() => <Page><Quiz/></Page>}
              />
              <Route
                key={2}
                exact
                path={["/results"]}
                render={() => <Page><Results/></Page>}
              />
         </Switch>
         {children}
        </BrowserRouter>
    );
}

export default AppRouter;