import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import FoodContextProvider from './FoodContext/foodContextProvider';
import Food from './pages/Food';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <FoodContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods/" component={ Food } />
          <Route path="/drinks/" component={ Drinks } />
          <Route path="/profile" component={ Profile } />
          <Route path="/explore" component={ Explore } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </Router>
    </FoodContextProvider>
  );
}

export default App;
