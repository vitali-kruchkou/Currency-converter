import { ActionTypes } from './constans.d';
import {
  GetCurrencyListAction,
  AsyncGetCurrencyListAction,
  Currency,
  GetCurrencyCourseAction,
  AsyncGetConvertCourseAction,
  GetCurrencyCourseListAction,
  AsyncGetCurrencyCourseListAction,
  GetCurrencyErrorAction,
  GetCurrencyListFirebaseAction,
  AsyncGetCurrencyListFirebaseAction,
  UserProps,
} from '@type/types';

export const getCurrencyListAction = (
  currency: Currency | null,
): GetCurrencyListAction => ({
  type: ActionTypes.GET_CURRENCY_LIST,
  payload: currency,
});

export const asyncGetCurrencyListAction = (): AsyncGetCurrencyListAction => ({
  type: ActionTypes.ASYNC_GET_CURRENCY_LIST,
});

export const getConvertCoureseAction = (
  currency: Currency | null,
): GetCurrencyCourseAction => ({
  type: ActionTypes.GET_CURRENCY_COURSE,
  payload: currency,
});

export const asyncGetConvertCourseAction = (
  currency: Currency | null,
): AsyncGetConvertCourseAction => ({
  type: ActionTypes.ASYNC_GET_CURRENCY_COURSE,
  payload: currency,
});

export const getCurrencyCourseListAction = (
  currency: Currency | null,
): GetCurrencyCourseListAction => ({
  type: ActionTypes.GET_CURRENCY_COURSE_LIST,
  payload: currency,
});

export const asyncGetCurrencyCourseListAction =
  (): AsyncGetCurrencyCourseListAction => ({
    type: ActionTypes.ASYNC_GET_CURRENCY_COURSE_LIST,
  });

export const getCurrencyErrorAction = (): GetCurrencyErrorAction => ({
  type: ActionTypes.GET_CURRENCY_ERROR,
});

export const getCurrencyListFirebaseAction = (
  currency: Currency | null,
): GetCurrencyListFirebaseAction => ({
  type: ActionTypes.GET_CURRENCY_LIST_FIREBASE,
  payload: currency,
});

export const asyncGetCurrencyListFirabseAction = (
  user: UserProps | null,
): AsyncGetCurrencyListFirebaseAction => ({
  type: ActionTypes.ASYNC_GET_CURRENCY_LIST_FIREBASE,
  payload: user,
});
