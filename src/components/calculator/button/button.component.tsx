import { useState } from 'react';

import { filterInput } from '../calculator';

import './button.styles.scss';

interface ButtonProps {
  name: string;
  value: string;
  display: string;
  handleClick: React.MouseEventHandler;
}

export const Button = ({
  name,
  value,
  display,
  handleClick,
  ...otherProps
}: ButtonProps) => {
  const [valid, setValid] = useState(true);

  const validateButton = (buttonValue: string) => {
    const nextPossibleDisplay = display + buttonValue;
    const filteredNextPossibleDisplay = filterInput(nextPossibleDisplay);
    const lastCharacter = display[display.length - 1];

    if (
      ['del', 'clear', '='].includes(buttonValue) ||
      lastCharacter === '('
    ) {
      return;
    }

    if (!Array.isArray(filteredNextPossibleDisplay)) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  return (
    <button
      value={value}
      className={valid ? 'button valid' : 'button invalid'}
      onClick={handleClick}
      onMouseEnter={() => validateButton(value)}
      onMouseLeave={() => validateButton(value)}
      {...otherProps}
    >
      {name}
    </button>
  );
};
