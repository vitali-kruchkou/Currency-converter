import { all } from '@redux-saga/core/effects';
import watchAuthResetPassword from './authSaga/resetPasswordSaga';
import watchAuthSignOut from './authSaga/sighOutSaga';
import watchAuthSignInGoogle from './authSaga/signInGoogleSaga';
import watchAuthSignIn from './authSaga/signInSaga';
import watchAuthSignUp from './authSaga/signUpSaga';

export default function* rootSaga(): Generator {
  yield all([
    watchAuthResetPassword(),
    watchAuthSignIn(),
    watchAuthSignUp(),
    watchAuthSignInGoogle(),
    watchAuthSignOut(),
  ]);
}
