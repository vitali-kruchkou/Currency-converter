import { all } from '@redux-saga/core/effects';
import watchAuthResetPassword from './authSaga/resetPasswordSaga';
import watchAuthSignOut from './authSaga/sighOutSaga';
import watchAuthSignInGoogle from './authSaga/signInGoogleSaga';
import watchAuthSignIn from './authSaga/signInSaga';
import watchAuthSignUp from './authSaga/signUpSaga';
import watchGetCurrencyCourse from './converterSaga/getCurrencyCourse';
import watchGetCurrencyCourseList from './converterSaga/getCurrencyCourseList';
import watchGetCurrencyList from './converterSaga/getCurrentListSaga';

export default function* rootSaga(): Generator {
  yield all([
    watchAuthResetPassword(),
    watchAuthSignIn(),
    watchAuthSignUp(),
    watchAuthSignInGoogle(),
    watchAuthSignOut(),
    watchGetCurrencyList(),
    watchGetCurrencyCourse(),
    watchGetCurrencyCourseList(),
  ]);
}
