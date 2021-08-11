import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import Style from './StyledPasswordReset';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { userEmail } from './constants';
import { asyncResetPassword } from '@store/actions/authActions';
import { AuthRoutes } from '@core/constants/routes';
import { ErrorAuthSelector } from '@store/selectors/selectors';

const PasswordReset = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const errorAuth = useSelector(ErrorAuthSelector);

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      if (name === userEmail) {
        setEmail(value);
      }
    },
    [],
  );

  const sendResetEmail = useCallback(() => {
    const user = { email };
    dispatch(asyncResetPassword(user));
    setEmail('');
    errorAuth && toast.error(`${errorAuth}`);
  }, [dispatch, email, errorAuth]);

  return (
    <Style.Container>
      <Toaster />
      <Style.Form>
        <Form>
          <Style.Title>{t('resetPassword.title')}</Style.Title>
          <Form.Item>
            <Input
              type={t('resetPassword.input.type')}
              name={t('resetPassword.input.name')}
              id={t('resetPassword.input.id')}
              placeholder={t('resetPassword.input.placeholder')}
              value={email}
              onChange={onChangeHandler}
            />
          </Form.Item>
          <Form.Item>
            <Style.Button>
              <button className="ResetPas" onClick={sendResetEmail}>
                {t('resetPassword.buttonResetPassword')}
              </button>
            </Style.Button>
          </Form.Item>
          <Link to={AuthRoutes.signIn}>
            &larr; {t('resetPassword.buttonBackSignIn')}
          </Link>
        </Form>
      </Style.Form>
    </Style.Container>
  );
};

export default PasswordReset;
