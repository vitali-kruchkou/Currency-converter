import { takeEvery, call, put } from 'redux-saga/effects';
import { getConvertCoureseAction } from '@store/actions/converterActions';
import { ActionTypes } from '@store/actions/constans.d';
import { AsyncGetConvertCourseAction } from '@type/types';

const api_key = '713f6f46003ddb9cf3b5';

function fetchData(fromCurrency: string, toCurrency: string) {
  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  const query = fromCurrency + '_' + toCurrency;

  const url =
    'https://free.currconv.com/api/v7/convert?q=' +
    query +
    '&compact=ultra&apiKey=' +
    api_key;

  return fetch(url)
    .then(res => res.json())
    .then(res => Object.values(res)[0]);
}

export function* workerGetCurrencyCourse(
  action: AsyncGetConvertCourseAction,
): Generator {
  const { fromCurrency, toCurrency } = action.payload;

  try {
    if (fromCurrency && toCurrency) {
      const data = yield call(fetchData, fromCurrency, toCurrency);
      yield put(getConvertCoureseAction(data));
    }
  } catch {
    console.log('Error');
  }
}

export default function* watchGetCurrencyCourse(): Generator {
  yield takeEvery(
    ActionTypes.ASYNC_GET_CURRENCY_COURSE,
    workerGetCurrencyCourse,
  );
}
