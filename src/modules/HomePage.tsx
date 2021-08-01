import React, { useCallback } from 'react';
import { asyncSignOutAction } from '@store/actions/authActions';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const signOut = useCallback(() => {
    dispatch(asyncSignOutAction());
  }, [dispatch]);

  return (
    <>
      <h1>Home</h1>
      <Button onClick={signOut}>{t('signOut.buttonSignOut')}</Button>
    </>
  );
};

export default Home;
