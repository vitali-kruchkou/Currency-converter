import React, { MouseEvent } from 'react';
import { SwapOutlined } from '@ant-design/icons';

interface SwitchButtonProps {
  handleSwitchCourse: (text: MouseEvent<HTMLButtonElement>) => void;
}

const SwitchButton = ({
  handleSwitchCourse,
}: SwitchButtonProps): JSX.Element => {
  return (
    <button onClick={handleSwitchCourse}>
      <SwapOutlined />
    </button>
  );
};

export default SwitchButton;
