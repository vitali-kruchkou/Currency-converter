import { signInWithGoogle } from '@firebaseConfig/firebaseAuthQueries';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { signErrorAction, signInAction } from '@store/actions/authActions';
import { ActionTypes } from '@store/actions/constans.d';

export const workerAuthSignInGoogle = function* (): Generator {
  try {
    const authChannel = yield call(signInWithGoogle);
    if (authChannel) {
      yield put(signInAction(authChannel));
    }
  } catch (error) {
    yield put(signErrorAction(error.message));
  }
};

export default function* watchAuthSignInGoogle(): Generator {
  yield takeLatest(ActionTypes.ASYNC_SIGN_IN_GOOGLE, workerAuthSignInGoogle);
}
