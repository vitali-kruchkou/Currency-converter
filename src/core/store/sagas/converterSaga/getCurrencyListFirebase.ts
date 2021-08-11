import { takeEvery, call, put } from 'redux-saga/effects';
import {
  getCurrencyListFirebaseAction,
  getCurrencyErrorAction,
} from '@store/actions/converterActions';
import { ActionTypes } from '@store/actions/constans.d';
import { AsyncGetCurrencyListFirebaseAction } from '@type/types';
import { getCurrencyList } from '@firebaseConfig/index';

export function* workerGetCurrencyListFirebase(
  action: AsyncGetCurrencyListFirebaseAction,
): Generator {
  const { uid } = action.payload;
  try {
    const data = yield call(getCurrencyList, uid);
    yield put(getCurrencyListFirebaseAction(data));
  } catch {
    yield put(getCurrencyErrorAction());
  }
}

export default function* watchGetCurrencyListFirebase(): Generator {
  yield takeEvery(
    ActionTypes.ASYNC_GET_CURRENCY_LIST_FIREBASE,
    workerGetCurrencyListFirebase,
  );
}
