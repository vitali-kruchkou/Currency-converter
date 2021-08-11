import { asyncGetConvertCourseAction } from '@store/actions/converterActions';
import { GetCourseSelector } from '@store/selectors/selectors';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

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
  const { t } = useTranslation();
  useEffect(() => {
    const currency = { fromCurrency, toCurrency };
    dispatch(asyncGetConvertCourseAction(currency));
  }, [fromCurrency, toCurrency, dispatch]);

  const getCourse = useSelector(GetCourseSelector);

  const handleConverCourse = useCallback(() => {
    if (getCourse) {
      const converterAmount = amount * getCourse;
      handleConvertAmount(converterAmount);
    }
  }, [amount, getCourse, handleConvertAmount]);

  return (
    <button onClick={handleConverCourse}>
      {t('converter.converterButton')}
    </button>
  );
};

export default ConverterButton;
