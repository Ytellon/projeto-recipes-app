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
import RecipeProgress from './pages/RecipeProgress';

function App() {
  return (
    <FoodContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods/" component={ Food } />
          <Route path="/drinks/:id" />
          <Route path="/foods/:id" />
          <Route exact path="/foods/" component={ Food } />
          <Route path="/drinks/" component={ Drinks } />
          <Route path="/profile" component={ Profile } />
          <Route path="/explore" component={ Explore } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/foods/in-progress" component={ RecipeProgress } />
          {/* <Route exact path="/foods/:id/in-progress" component={ RecipeProgess } /> rota oficial */}
        </Switch>
      </Router>
    </FoodContextProvider>
  );
}

export default App;
