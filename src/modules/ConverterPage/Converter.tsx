import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CurryncyRow from './components/CurrencyRow/CurrencyRow';
import { asyncGetCurrencyListAction } from '@store/actions/converterActions';
import ConverterButton from './components/Buttons/ConverterButton';
import SwitchButton from './components/Buttons/SwicthButtons';
import Style from './StyledConverter';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Converter = (): JSX.Element => {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState();
  const [convertAmount, setConvertAmount] = useState();
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
    setConvertAmount(event);
  }, []);

  const handleSwitchCourse = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  return (
    <>
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
