import { AuthRoutes } from '@core/constants/routes';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Converter from './ConverterPage/Converter';
import CurrentList from './CurrentListPage/CurrentListPage';
import SecondPage from './SecondPage/SecondPage';

const HomePage = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route path={AuthRoutes.profile} component={SecondPage} />
        <Route path={AuthRoutes.convert} component={Converter} />
        <Route path={AuthRoutes.currentlist} component={CurrentList} />
        <Route path="/">
          <Redirect to={AuthRoutes.convert} />
        </Route>
      </Switch>
    </>
  );
};

export default HomePage;
