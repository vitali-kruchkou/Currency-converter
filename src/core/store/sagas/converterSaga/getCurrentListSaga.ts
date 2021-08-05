import { takeEvery, call, put } from 'redux-saga/effects';
import {
  getCurrencyErrorAction,
  getCurrencyListAction,
} from '@store/actions/converterActions';
import { ActionTypes } from '@store/actions/constans.d';

function fetchData() {
  return fetch(
    `https://free.currconv.com/api/v7/currencies?apiKey=713f6f46003ddb9cf3b5`,
  ).then(res => res.json());
}

export function* workerGetCurrencyList(): Generator {
  try {
    const data = yield call(fetchData);
    yield put(getCurrencyListAction(data));
  } catch {
    yield put(getCurrencyErrorAction());
  }
}

export default function* watchGetCurrencyList(): Generator {
  yield takeEvery(ActionTypes.ASYNC_GET_CURRENCY_LIST, workerGetCurrencyList);
}
