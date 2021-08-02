import { ActionTypes } from '@store/actions/constans.d';

export type User = {
  email?: string;
  uid?: string;
  password?: string;
};

export type Currency = {
  data?: Array;
  course?: number;
  fromCurrency?: string;
  toCurrency?: string;
};

export type AuthActions =
  | SignInAction
  | SignUpAction
  | ResetPasswordAction
  | SignOutAction
  | SignErrorAction
  | AsyncSignOutAction
  | AsyncSignInAction
  | AsyncSignInGoogleAction
  | AsyncSignUpAction
  | AsyncResetPasswordAction;

export interface SignInAction {
  type: typeof ActionTypes.SIGN_IN;
  payload: User | null;
}

export interface SignUpAction {
  type: typeof ActionTypes.SIGN_UP;
  payload: User | null;
}

export interface ResetPasswordAction {
  type: typeof ActionTypes.RESET_PASSW;
}

export interface SignOutAction {
  type: typeof ActionTypes.SIGN_OUT;
}

export interface SignErrorAction {
  type: typeof ActionTypes.SIGN_ERROR;
}

export interface AsyncSignOutAction {
  type: typeof ActionTypes.ASYNC_SIGN_OUT;
}

export interface AsyncSignInAction {
  type: typeof ActionTypes.ASYNC_SIGN_IN;
  payload: User | null;
}

export interface AsyncSignInGoogleAction {
  type: typeof ActionTypes.ASYNC_SIGN_IN_GOOGLE;
  payload: User | null;
}

export interface AsyncSignUpAction {
  type: typeof ActionTypes.ASYNC_SIGN_UP;
  payload: User | null;
}

export interface AsyncResetPasswordAction {
  type: typeof ActionTypes.ASYNC_RESET_PASSWORD;
  payload: User | null;
}

export interface AuthState {
  login: boolean;
  user: User | null;
}

export type CurrencyActions =
  | GetCurrencyListAction
  | AsyncGetCurrencyListAction
  | GetCurrencyCourseAction
  | AsyncGetConvertCourseAction;

export interface GetCurrencyListAction {
  type: typeof ActionTypes.GET_CURRENCY_LIST;
  payload: Currency | null;
}

export interface AsyncGetCurrencyListAction {
  type: typeof ActionTypes.ASYNC_GET_CURRENCY_LIST;
}

export interface GetCurrencyCourseAction {
  type: typeof ActionTypes.GET_CURRENCY_COURSE;
  payload: Currency | null;
}

export interface AsyncGetConvertCourseAction {
  type: typeof ActionTypes.ASYNC_GET_CURRENCY_COURSE;
  payload: Currency | null;
}

export interface CurrencyState {
  data: Currency | null;
  course: Currency | null;
}

export type RootState = ReturnType<typeof rootReducer>;
