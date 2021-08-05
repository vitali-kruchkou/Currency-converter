import { takeEvery, call, put } from 'redux-saga/effects';
import {
  getCurrencyCourseListAction,
  getCurrencyErrorAction,
} from '@store/actions/converterActions';
import { ActionTypes } from '@store/actions/constans.d';

function fetchData() {
  return fetch(`https://www.nbrb.by/api/exrates/rates?periodicity=0`).then(
    res => res.json(),
  );
}

export function* workerGetCurrencyCourseList(): Generator {
  try {
    const data = yield call(fetchData);
    yield put(getCurrencyCourseListAction(data));
  } catch {
    yield put(getCurrencyErrorAction());
  }
}

export default function* watchGetCurrencyCourseList(): Generator {
  yield takeEvery(
    ActionTypes.ASYNC_GET_CURRENCY_COURSE_LIST,
    workerGetCurrencyCourseList,
  );
}
