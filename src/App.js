import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Meals } />
      </Switch>
    </Router>
  );
}

export default App;
