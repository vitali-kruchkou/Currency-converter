import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CurryncyRow from './components/CurrencyRow/CurrencyRow';
import { asyncGetCurrencyListAction } from '@store/actions/converterActions';
import ConverterButton from './components/ConverterButton';
import SwitchButton from './components/SwicthButtons';

const Converter = (): JSX.Element => {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState();
  const [convertAmount, setConvertAmount] = useState();

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
      <input type="number" onChange={handleFromAmount} />
      <CurryncyRow
        onChangeCurrency={handleFromCurrency}
        amount={amount}
        value={fromCurrency}
      />
      <CurryncyRow onChangeCurrency={handleToCurrency} value={toCurrency} />
      <SwitchButton handleSwitchCourse={handleSwitchCourse} />
      <ConverterButton
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
        handleConvertAmount={handleConvertAmount}
      />
      <input type="number" value={convertAmount} readOnly={true} />
    </>
  );
};

export default Converter;
