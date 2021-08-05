/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Select } from 'antd';

interface CurryncyRowProps {
  value: any;
  onChangeCurrency: (value: number) => void;
  amount?: undefined;
}

const CurryncyRow = ({
  onChangeCurrency,
  value,
}: CurryncyRowProps): JSX.Element => {
  const [currencyList, setCurrencyList] = useState(null);
  const { Option } = Select;
  const list = useSelector(
    (state: RootStateOrAny) => state.currentConverter.data,
  );

  useEffect(() => {
    if (list) {
      setCurrencyList(
        Object.keys(list.results).sort((a, b) => a[0].localeCompare(b[0])),
      );
    }
  }, [list]);

  return (
    <>
      <div>
        <Select
          style={{ width: 120 }}
          onChange={onChangeCurrency}
          value={value}>
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
      </div>
    </>
  );
};

export default CurryncyRow;
