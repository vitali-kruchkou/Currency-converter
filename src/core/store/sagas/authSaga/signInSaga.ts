import { signInEmailAndPassword } from '@firebaseConfig/firebaseAuthQueries';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { signErrorAction, signInAction } from '@store/actions/authActions';
import { ActionTypes } from '@store/actions/constans.d';
import { AsyncSignInAction } from '@type/types';

export function* workerAuthSignIn(action: AsyncSignInAction): Generator {
  const { email, password } = action.payload;

  try {
    const authChannel = yield call(signInEmailAndPassword, email, password);
    if (authChannel) {
      yield put(signInAction(authChannel));
    }
  } catch (error) {
    yield put(signErrorAction(error.message));
  }
}

export default function* watchAuthSignIn(): Generator {
  yield takeLatest(ActionTypes.ASYNC_SIGN_IN, workerAuthSignIn);
}
