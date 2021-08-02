import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import SelectOption from './SelectOption';
import Select, { components } from 'react-select';

export function IconOption(Comp: any) {
  return function SelectComponent(props: any): JSX.Element {
    const { data } = props;
    return (
      <>
        <Comp {...props}>
          <SelectOption data={data} />
        </Comp>
      </>
    );
  };
}

interface CurryncyRowProps {
  value: number | string;
  onChangeCurrency: (value: number) => void;
  amount?: undefined;
}

const CurryncyRow = ({
  onChangeCurrency,
  value,
}: CurryncyRowProps): JSX.Element => {
  const [currencyList, setCurrencyList] = useState(null);

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

  // const { onChangeCurrency, value } = props;

  return (
    <>
      <div
        style={{
          width: 500,
          marginLeft: 100,
        }}>
        {currencyList && (
          <Select
            className="react-select-container"
            options={currencyList}
            onChange={onChangeCurrency}
            value={currencyList.filter(function (option: string) {
              return option === value;
            })}
            placeholder="Select Currency"
            getOptionLabel={option => option}
            components={{
              Option: IconOption(components.Option),
              SingleValue: IconOption(components.SingleValue),
            }}
          />
        )}
      </div>
    </>
  );
};

export default CurryncyRow;
