import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CurryncyRow from './components/CurrencyRow/CurrencyRow';
import { asyncGetCurrencyListAction } from '@store/actions/converterActions';
import ConverterButton from './components/Buttons/ConverterButton';
import SwitchButton from './components/Buttons/SwicthButtons';
import Style from './StyledConverter';
import { Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { asyncSignOutAction } from '@store/actions/authActions';
import { AuthRoutes } from '@core/constants/routes';

const Converter = (): JSX.Element => {
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [convertAmount, setConvertAmount] = useState<string>('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(asyncGetCurrencyListAction());
  }, [dispatch]);

  const handleFromCurrency = useCallback(value => {
    setFromCurrency(value);
  }, []);

  const handleToCurrency = useCallback(event => {
    setToCurrency(event);
  }, []);

  const handleFromAmount = useCallback(event => {
    setAmount(event.target.value);
  }, []);

  const handleConvertAmount = useCallback(event => {
    setConvertAmount(event.toFixed(4));
  }, []);

  const handleSwitchCourse = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const historyGoCurrentList = useCallback(() => {
    history.push(AuthRoutes.currentlist);
  }, [history]);

  const signOut = useCallback(() => {
    dispatch(asyncSignOutAction());
  }, [dispatch]);

  return (
    <>
      <Style.Buttons>
        <Button type="ghost" onClick={signOut}>
          {t('signOut.buttonSignOut')}
        </Button>
        <Button type="ghost" onClick={historyGoCurrentList}>
          Current List
        </Button>
      </Style.Buttons>
      <Style.Container>
        <Style.AmountText>{t('converter.amountText')}</Style.AmountText>
        <Input type="number" onChange={handleFromAmount} />
        <Style.Label>
          {t('converter.labelFrom')}
          <Style.Select>
            <CurryncyRow
              onChangeCurrency={handleFromCurrency}
              amount={amount}
              value={fromCurrency}
            />
          </Style.Select>
        </Style.Label>
        <SwitchButton handleSwitchCourse={handleSwitchCourse} />
        <Style.Label>
          {t('converter.labelTo')}
          <Style.Select>
            <CurryncyRow
              onChangeCurrency={handleToCurrency}
              value={toCurrency}
            />
          </Style.Select>
        </Style.Label>
        <ConverterButton
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          amount={amount}
          handleConvertAmount={handleConvertAmount}
        />
        <Input type="number" value={convertAmount} readOnly={true} />
      </Style.Container>
    </>
  );
};

export default Converter;
