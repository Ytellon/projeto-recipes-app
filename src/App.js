import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Router>
      <SearchBar />
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </Router>
  );
}

export default App;
