import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

export default function Explore() {
  return (
    <div>
      <Header
        title="Explore"
        showSearchIcon={ false }
      />
      <Button
        dataTestIdButton="explore-button-1"
        name="Explore 1"
        onClick={ () => console.log('Explore 1') }
      />
      <Button
        dataTestIdButton="explore-button-2"
        name="Explore 2"
        onClick={ () => console.log('Explore 2') }
      />
    </div>
  );
}
