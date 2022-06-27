import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';

export default function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user.email);
  }, []);

  return (
    <div>
      <Header
        title="Profile"
        showSearchIcon={ false }
      />
      <h3 data-testid="profile-email">
        { email ? `${email}` : 'registration required' }
      </h3>
      <Button
        dataTestIdButton="profile-done-btn"
        name="Done Recipes"
        onClick={ () => history.push('/done-recipes') }
      />
      <Button
        dataTestIdButton="profile-favorite-btn"
        name="Favorite Recipes"
        onClick={ () => history.push('/favorite-recipes') }
      />
      <Button
        dataTestIdButton="profile-logout-btn"
        name="Logout"
        onClick={ () => { localStorage.clear(); history.push('/'); } }
      />
    </div>
  );
}
