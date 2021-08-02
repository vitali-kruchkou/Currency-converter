import { asyncGetConvertCourseAction } from '@store/actions/converterActions';
import React, { useCallback, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

interface ConverterButtonProps {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  handleConvertAmount: (text: number) => void;
}

const ConverterButton = ({
  fromCurrency,
  toCurrency,
  amount,
  handleConvertAmount,
}: ConverterButtonProps): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const currency = { fromCurrency, toCurrency };
    dispatch(asyncGetConvertCourseAction(currency));
  }, [fromCurrency, toCurrency, dispatch]);

  const getCourse = useSelector(
    (state: RootStateOrAny) => state.currentConverter.course,
  );

  const handleConverCourse = useCallback(() => {
    if (getCourse) {
      const converterAmount = amount * getCourse;
      handleConvertAmount(converterAmount);
    }
  }, [amount, getCourse, handleConvertAmount]);

  return <button onClick={handleConverCourse}>Convert</button>;
};

export default ConverterButton;
