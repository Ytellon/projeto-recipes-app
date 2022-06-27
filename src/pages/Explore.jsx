import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import BottomMenu from '../components/BottomMenu';

export default function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header
        title="Explore"
        showSearchIcon={ false }
      />
      <Button
        dataTestIdButton="explore-foods"
        name="Explore Foods"
        onClick={ () => history.push('/explore/foods') }
      />
      <Button
        dataTestIdButton="explore-drinks"
        name="Explore Drinks"
        onClick={ () => history.push('/explore/drinks') }
      />
      <BottomMenu />
    </div>
  );
}
