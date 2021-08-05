import React, { useCallback } from 'react';
import { Input, Divider, Tooltip } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Style from './StyledSignUp';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { AuthRoutes } from '@core/constants/routes';
import { asyncSignInGoogle, asyncSignUp } from '@store/actions/authActions';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Color } from '@core/constants/colors';

const SignUp = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const errorAuth = useSelector(
    (state: RootStateOrAny) => state.currentAuth.error,
  );

  const formik = useFormik({
    initialValues: {
      displayName: '',
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
      dispatch(asyncSignUp(user));
      errorAuth && toast.error(`${errorAuth}`);
      history.push(AuthRoutes.home);
    },
  });

  const logginGoogle = useCallback(() => {
    try {
      dispatch(asyncSignInGoogle());
    } catch (error) {
      toast.error(error.message);
    }
  }, [dispatch]);

  return (
    <Style.Container>
      <Toaster />
      <Style.Form>
        <form className="form" onSubmit={formik.handleSubmit}>
          <Style.Title>{t('signUp.title')}</Style.Title>
          <Style.Field>
            <Input
              type={t('signUp.input.displayName.type')}
              name={t('signUp.input.displayName.name')}
              placeholder={t('signUp.input.displayName.placeholder')}
              id={t('signUp.input.displayName.id')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.displayName}
              prefix={<UserOutlined />}
            />
            <Input
              type={t('signUp.input.email.type')}
              name={t('signUp.input.email.name')}
              placeholder={t('signUp.input.email.placeholder')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              prefix={<UserOutlined />}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="error">{formik.errors.email}</span>
            ) : null}
            <Input.Password
              type={t('signUp.input.password.type')}
              name={t('signUp.input.password.name')}
              placeholder={t('signUp.input.password.placeholder')}
              id={t('signUp.input.password.id')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
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
              <button type="submit" className="SignUp">
                {t('signUp.buttonSignUp')}
              </button>
            </Style.Button>
          </Style.Field>
        </form>
        <Style.Links>
          <p> {t('signUp.textBeforeSignIn')}</p>
          <Link to={AuthRoutes.signIn}>{t('signUp.buttonSignIn')}</Link>
        </Style.Links>

        <Divider plain>{t('signUp.textBeforeGoogle')}</Divider>
        <Style.Button>
          <button onClick={logginGoogle}>
            {t('signUp.buttonSignInGoogle')}
          </button>
        </Style.Button>
      </Style.Form>
    </Style.Container>
  );
};

export default SignUp;
