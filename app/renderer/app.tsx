import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Router>
        <Link to="/">goto home</Link>
        <br/>
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
