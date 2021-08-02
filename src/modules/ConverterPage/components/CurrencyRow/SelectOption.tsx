import React from 'react';

interface SelectOptionProps {
  data: string;
}

const SelectOption = ({ data }: SelectOptionProps): JSX.Element => {
  return (
    <div className="currency-option">
      {data ? (
        <i className={`currency-flag currency-flag-${data.toLowerCase()}`} />
      ) : null}
      {data ?? ''}
    </div>
  );
};

export default SelectOption;
