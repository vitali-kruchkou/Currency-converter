import { UserSelecotor } from '@store/selectors/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import Style from './StyledProfilePage';

const ProfilePage = (): JSX.Element => {
  const user = useSelector(UserSelecotor);

  return (
    <>
      <Style.Container>
        <img src={user.photoURL} />
        <h1>{user.displayName}</h1>
        <h1>{user.email}</h1>
      </Style.Container>
    </>
  );
};

export default ProfilePage;
