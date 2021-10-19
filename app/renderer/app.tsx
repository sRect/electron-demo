import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Title from "./components/Title";

function App() {
  const data = {
    text: "test props",
    styles: {
      color: "red",
      fontSize: 20,
    }
  }

  return (
    <Router>
      <Switch>
        <Route path="/" render={() => (<div>
          <h1>Electron + React</h1>
            <Title {...data} />
        </div>)} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
