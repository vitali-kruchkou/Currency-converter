import { ActionTypes } from './constans.d';
import {
  AsyncResetPasswordAction,
  AsyncSignInAction,
  AsyncSignInGoogleAction,
  AsyncSignOutAction,
  AsyncSignUpAction,
  ErrorAuth,
  ResetPasswordAction,
  SignErrorAction,
  SignInAction,
  SignOutAction,
  SignUpAction,
  User,
} from '@type/types';

export const signInAction = (user: User | null): SignInAction => {
  return {
    type: ActionTypes.SIGN_IN,
    payload: user,
  };
};

export const signUpAction = (user: User | null): SignUpAction => {
  return {
    type: ActionTypes.SIGN_UP,
    payload: user,
  };
};

export const signOutAction = (): SignOutAction => {
  return {
    type: ActionTypes.SIGN_OUT,
  };
};

export const resetPasswordAction = (): ResetPasswordAction => {
  return {
    type: ActionTypes.RESET_PASSW,
  };
};

export const signErrorAction = (error: ErrorAuth): SignErrorAction => {
  return {
    type: ActionTypes.SIGN_ERROR,
    payload: error,
  };
};

export const asyncSignInAction = (user: User | null): AsyncSignInAction => {
  return {
    type: ActionTypes.ASYNC_SIGN_IN,
    payload: user,
  };
};

export const asyncSignOutAction = (): AsyncSignOutAction => {
  return {
    type: ActionTypes.ASYNC_SIGN_OUT,
  };
};

export const asyncSignInGoogle = (): AsyncSignInGoogleAction => {
  return {
    type: ActionTypes.ASYNC_SIGN_IN_GOOGLE,
  };
};

export const asyncSignUp = (user: User | null): AsyncSignUpAction => {
  return {
    type: ActionTypes.ASYNC_SIGN_UP,
    payload: user,
  };
};

export const asyncResetPassword = (
  user: User | null,
): AsyncResetPasswordAction => {
  return {
    type: ActionTypes.ASYNC_RESET_PASSWORD,
    payload: user,
  };
};
