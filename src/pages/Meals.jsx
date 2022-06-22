import React from 'react';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

export default function Meals() {
  return (
    <div>
      <Header
        title="Foods"
        showSearchIcon
      />
      <BottomMenu />
    </div>
  );
}
