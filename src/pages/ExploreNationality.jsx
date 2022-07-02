import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import { getAllMealsInitial, getAllMealsNationalities } from '../service/mealAPI';

export default function ExploreNationality() {
  const [nationalities, setNationalities] = useState([]);
  const [meals, setMeals] = useState([]);
  console.log(meals);
  useEffect(() => {
    const areaMeals = async () => {
      const areas = await getAllMealsNationalities();
      setNationalities(areas);
    };
    areaMeals();

    const getMeals = async () => {
      const foods = await getAllMealsInitial();
      setMeals(foods);
    };
    getMeals();
  }, []);

  return (
    <div>
      <Header
        title="Explore Nationalities"
        showSearchIcon
      />
      <select data-testid="explore-by-nationality-dropdown">
        { nationalities.map(({ strArea }) => (
          <option
            key={ strArea }
            data-testid={ `${strArea}-option` }
          >
            { strArea }
          </option>
        )) }
      </select>
      { meals.map(({ strMeal, strMealThumb }, index) => {
        const limit = 12;
        if (index < limit) {
          return (
            <div key={ strMeal } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
            </div>
          );
        }
        return '';
      }) }
      <BottomMenu />
    </div>
  );
}
