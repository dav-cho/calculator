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

  // For each button, ompare the current display with the display if button is pressed
  // and validate that input to determine if the button is valid or invalid.
  // Updates the classname/styling for each button
  const validateButton = (buttonValue: string) => {
    const nextPossibleDisplay = display + buttonValue;
    const filteredNextPossibleDisplay = filterInput(nextPossibleDisplay);
    const lastCharacter = display[display.length - 1];

    // We can ignore the following buttons because they are always valid
    if (['del', 'clear'].includes(buttonValue) || lastCharacter === '(') {
      return;
    }

    // Validate the equals button based on the current display since
    // it is not a value that is added to the input
    if (buttonValue === '=') {
      const filteredCurrentDisplay = filterInput(display);

      if (Array.isArray(filteredCurrentDisplay)) {
        setValid(true);
      } else {
        setValid(false);
      }
    }

    // Handle all other buttons that enter characters into the display input
    else if (!Array.isArray(filteredNextPossibleDisplay)) {
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
