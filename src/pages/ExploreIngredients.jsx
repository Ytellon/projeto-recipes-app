import React from 'react';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

export default function ExploreIngredients() {
  return (
    <div>
      <Header
        title="Explore Ingredients"
        showSearchIcon={ false }
      />
      <BottomMenu />
    </div>
  );
}
