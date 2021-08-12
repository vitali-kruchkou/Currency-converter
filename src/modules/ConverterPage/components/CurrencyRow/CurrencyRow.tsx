/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import Style from './StyledCurrencyRow';
import { CurrencyListSelector } from '@store/selectors/selectors';
interface CurryncyRowProps {
  value: any;
  onChangeCurrency: (value: number) => void;
  amount?: number;
}

const CurryncyRow = ({
  onChangeCurrency,
  value,
}: CurryncyRowProps): JSX.Element => {
  const [currencyList, setCurrencyList] = useState<Array<string>>(null);
  const { Option } = Select;
  const list = useSelector(CurrencyListSelector);

  useEffect(() => {
    if (list) {
      setCurrencyList(
        Object.keys(list.results).sort((a, b) => a[0].localeCompare(b[0])),
      );
    }
  }, [list]);

  return (
    <>
      <Style.Select>
        <Select onChange={onChangeCurrency} value={value}>
          {currencyList &&
            currencyList.map((option: string, index: number) => (
              <Option value={option} key={index}>
                <i
                  className={`currency-flag currency-flag-${option.toLowerCase()}`}
                />
                {option}
              </Option>
            ))}
        </Select>
      </Style.Select>
    </>
  );
};

export default CurryncyRow;
