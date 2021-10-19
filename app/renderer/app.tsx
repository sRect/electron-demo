import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Router>
        <Switch>
          {routes.map((route) => {
            const { path, exact, component } = route;
            return <Route key={path} path={path} exact={exact} component={component} />;
          })}
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
