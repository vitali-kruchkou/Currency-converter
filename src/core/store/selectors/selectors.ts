import { RootStateOrAny } from 'react-redux';
import { createSelector } from 'reselect';

const selectErrorAuth = (state: RootStateOrAny) => state.currentAuth.error;

const selectCurrencyList = (state: RootStateOrAny) =>
  state.currentConverter.data;

const selectGetCourse = (state: RootStateOrAny) =>
  state.currentConverter.course;

const selectFavouriteCourse = (state: RootStateOrAny) =>
  state.currentConverter.favouriteCourse;
const selectUser = (state: RootStateOrAny) => state.currentAuth.user;

export const CurrencyListSelector = createSelector(
  selectCurrencyList,
  list => list,
);

export const ErrorAuthSelector = createSelector(
  selectErrorAuth,
  error => error,
);

export const GetCourseSelector = createSelector(
  selectGetCourse,
  course => course,
);

export const UserSelecotor = createSelector(selectUser, user => user);

export const FavouriteCourseSelector = createSelector(
  selectFavouriteCourse,
  favouriteCourse => favouriteCourse,
);
