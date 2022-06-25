import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Food from './pages/Food';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Details from './pages/Details';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Food } />
      <Route exact path="/foods/:id" render={ (props) => <Details { ...props } /> } />
      <Route exact path="/drinks/:id" render={ (props) => <Details { ...props } /> } />
      <Route path="/drinks" component={ Drinks } />
      {/* <Route path="/details/:id" render={ (props) => <Details { ...props } /> } /> */}
      <Route path="/profile" component={ Profile } />
      <Route path="/explore" component={ Explore } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
