import { ActionTypes } from './constans.d';
import {
  GetCurrencyListAction,
  AsyncGetCurrencyListAction,
  Currency,
  GetCurrencyCourseAction,
  AsyncGetConvertCourseAction,
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
