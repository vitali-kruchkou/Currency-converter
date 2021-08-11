import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Divider, Tooltip } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import {
  UserOutlined,
  GoogleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import Style from './StyledSignIn';
import { useTranslation } from 'react-i18next';

import { Color } from '@core/constants/colors';
import {
  asyncSignInGoogle,
  asyncSignInAction,
} from '@store/actions/authActions';
import { AuthRoutes } from '@core/constants/routes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorAuthSelector } from '@store/selectors/selectors';

const SignIn = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const errorAuth = useSelector(ErrorAuthSelector);

  const logginGoogle = useCallback(() => {
    dispatch(asyncSignInGoogle());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please enter email'),
      password: Yup.string().required('Please enter password'),
    }),
    onSubmit: values => {
      const { email, password } = values;
      const user = { email, password };
      dispatch(asyncSignInAction(user));
      errorAuth && toast.error(`${errorAuth}`);
    },
  });

  useEffect(() => {
    errorAuth && toast.error(`${errorAuth}`);
  }, [errorAuth]);

  return (
    <>
      <Style.Container>
        <Toaster />
        <Style.Form>
          <Style.Title>{t('signIn.title')}</Style.Title>
          <Divider />
          <Style.MainText>{t('signIn.mainText1')}</Style.MainText>
          <Style.MainText>{t('signIn.mainText2')}</Style.MainText>
          <Divider />
          <form className="form" onSubmit={formik.handleSubmit}>
            <Style.Field>
              <Input
                type={t('signIn.input.email.type')}
                name={t('signIn.input.email.name')}
                placeholder={t('signIn.input.email.placeholder')}
                id={t('signIn.input.email.id')}
                value={formik.values.email}
                onChange={formik.handleChange}
                prefix={<UserOutlined />}
                suffix={
                  <Tooltip title={t('signIn.extraInformation')}>
                    <InfoCircleOutlined style={{ color: Color.AuthFormIcon }} />
                  </Tooltip>
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="error">{formik.errors.email}</span>
              ) : null}
              <Input.Password
                type={t('signIn.input.password.type')}
                name={t('signIn.input.password.name')}
                placeholder={t('signIn.input.password.placeholder')}
                id={t('signIn.input.password.id')}
                value={formik.values.password}
                onChange={formik.handleChange}
                suffix={
                  <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: Color.AuthFormIcon }} />
                  </Tooltip>
                }
              />
              {formik.touched.password && formik.errors.password ? (
                <span className="error">{formik.errors.password}</span>
              ) : null}
              <Style.Button>
                <button className="SignIn" type="submit">
                  {t('signIn.buttonLogin')}
                </button>
              </Style.Button>
            </Style.Field>
          </form>
          <Style.Links>
            <Link to={AuthRoutes.signUp}>
              <span className="SignUp">{t('signIn.buttonSignUp')} </span>
            </Link>{' '}
            <br />
            <Link to={AuthRoutes.passwordReset}>
              <span>{t('signIn.buttonForgetPassword')}</span>
            </Link>
          </Style.Links>
          <Divider plain>{t('signIn.textBeforeGoogle')}</Divider>

          <Style.Button>
            <button className="Google" onClick={logginGoogle}>
              <GoogleOutlined />
              <span>{t('signIn.textGoogle')}</span>
            </button>
          </Style.Button>
        </Style.Form>
      </Style.Container>
    </>
  );
};

export default SignIn;
