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
import RecipeProgress from './pages/RecipeProgress';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreNationality from './pages/ExploreNationality';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods/" component={ Food } />
      <Route exact path="/drinks/" component={ Drinks } />
      <Route exact path="/foods/:id" render={ (props) => <Details { ...props } /> } />
      <Route exact path="/drinks/:id" render={ (props) => <Details { ...props } /> } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods/ingredients" component={ ExploreIngredients } />
      <Route exact path="/explore/drinks/ingredients" component={ ExploreIngredients } />
      <Route exact path="/explore/foods/nationalities" component={ ExploreNationality } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/foods/:id/in-progress" component={ RecipeProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeProgress } />

    </Switch>
  );
}

export default App;
