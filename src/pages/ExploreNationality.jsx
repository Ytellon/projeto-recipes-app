import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import { getAllMealsInitial,
  getAllMealsNationalities, getMealsByNationality } from '../service/mealAPI';

export default function ExploreNationality() {
  const [nationalities, setNationalities] = useState([]);

  const [meals, setMeals] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const areaMeals = async () => {
      const areas = await getAllMealsNationalities();
      setNationalities(areas);
    };
    areaMeals();

    const getMeals = async () => {
      const foods = await getAllMealsInitial();
      setMeals(foods);
      setFilteredFoods(foods);
    };
    getMeals();
  }, []);

  const filterMealsByNationality = async ({ target: { value } }) => {
    if (value === 'All') {
      return setFilteredFoods(meals);
    }
    const foods = await getMealsByNationality(value);
    return setFilteredFoods(foods);
  };

  return (
    <div>
      <Header
        title="Explore Nationalities"
        showSearchIcon
      />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ (event) => filterMealsByNationality(event) }
      >
        <option data-testid="All-option">All</option>
        { nationalities.map(({ strArea }) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ strArea }
            value={ strArea }
          >
            { strArea }
          </option>
        )) }
      </select>
      { filteredFoods.map(({ strMeal, strMealThumb, idMeal }, index) => {
        const limit = 12;
        if (index < limit) {
          return (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ strMeal }
            >
              <button
                type="button"
                onClick={ () => history.push(`/foods/${idMeal}`) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                />
                <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
              </button>
            </div>
          );
        }
        return '';
      }) }
      <BottomMenu />
    </div>
  );
}
