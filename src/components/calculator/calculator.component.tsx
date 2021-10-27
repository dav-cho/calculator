import { useState, useEffect } from 'react';

import { Display } from './display/display.component';
import { Controls } from './controls/controls.component';

import { checkButtonValueType } from './calculator.utils';

import './calculator.styles.scss';

export const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [validButton, setValidButton] = useState(true);

  const handleClick = (e: React.BaseSyntheticEvent<MouseEvent>) => {
    // e.preventDefault;

    const buttonValue = e.target.value;

    switch (checkButtonValueType(buttonValue)) {
      case 'number':
        // TODO: add to equation stack
        setDisplay(prevDisplay => prevDisplay + buttonValue);
        break;
      case 'operator':
        // TODO: add to equation stack
        setDisplay(prevDisplay => prevDisplay + buttonValue);
        break;
      case 'decimal':
        // TODO: check stack for digits to left and right
        setDisplay(prevDisplay => prevDisplay + buttonValue);
        break;
      case 'parens':
        // TODO: check stack for valid parens
        setDisplay(prevDisplay => prevDisplay + buttonValue);
        break;
      case 'del':
        setDisplay(prevDisplay => prevDisplay.slice(0, prevDisplay.length - 1));
        break;
      case 'clear':
        setDisplay('');
        break;
      default:
        console.log('~ BUTTON VALUE NOT FOUND');
    }
  };

  useEffect(() => {
    console.log('~ display', display);
  }, [display]);

  return (
    <div className="calculator">
      <Display currDisplay={display} setDisplay={setDisplay} />
      <Controls handleClick={handleClick} valid={validButton} />
      {/* <Controls valid={validButton} setDisplay={setDisplay} handleClick={handleClick} /> */}
    </div>
  );
};
