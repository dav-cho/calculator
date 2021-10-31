import { useState, useEffect, useCallback } from 'react';

import { filterInput, calculate } from './calculator';
import { checkValidInputValue } from './calculator.utils';
import { useErrorMessageContext } from '../../contexts/error-message.context';

import { Display } from './display/display.component';
import { Controls } from './controls/controls.component';

import './calculator.styles.scss';

interface CalculatorProps {
  helpModalOpen: boolean;
}

export const Calculator = ({ helpModalOpen }: CalculatorProps) => {
  const [display, setDisplay] = useState('');
  const [displayFocused, setDisplayFocused] = useState(false);
  const { setIsInvalidExpression, setErrorMessage } = useErrorMessageContext();

  const handleCalculate = useCallback(() => {
    const result = calculate(display);

    if (!display) {
      return;
    }

    if (typeof result === 'string') {
      setIsInvalidExpression(true);
      setErrorMessage(result);
    } else {
      setDisplay(result.toString());
    }
  }, [display, setIsInvalidExpression, setErrorMessage]);

  const handleClick = (event: React.BaseSyntheticEvent<MouseEvent>) => {
    const buttonValue = event.target.value;

    if (buttonValue === '=') {
      handleCalculate();
    } else if (buttonValue === 'clear') {
      setDisplay('');
    } else if (buttonValue === 'del') {
      setDisplay(prevDisplay => prevDisplay.slice(0, prevDisplay.length - 1));
    } else {
      setDisplay(prevDisplay => prevDisplay + buttonValue);
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keyValue = event.key;

      if (helpModalOpen) {
        return;
      }

      if (checkValidInputValue(keyValue) && !displayFocused) {
        if (['=', 'Enter'].includes(keyValue)) {
          handleCalculate();
        } else if (keyValue === 'Escape') {
          setDisplay('');
        } else if (keyValue === 'Backspace') {
          setDisplay(prevDisplay =>
            prevDisplay.slice(0, prevDisplay.length - 1)
          );
        } else {
          setDisplay(prevDisplay => prevDisplay + keyValue);
        }
      }

      if (keyValue === 'Enter' && displayFocused) {
        handleCalculate();
      } else if (keyValue === 'Escape') {
        setDisplay('');
      }
    },
    [displayFocused, handleCalculate, helpModalOpen]
  );

  useEffect(() => {
    const validatedDisplay = filterInput(display);

    if (!display) {
      setIsInvalidExpression(false);
    }

    if (typeof validatedDisplay === 'string') {
      setIsInvalidExpression(true);
      setErrorMessage(validatedDisplay);
    } else {
      setIsInvalidExpression(false);
    }
  }, [display, setDisplay, setIsInvalidExpression, setErrorMessage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="calculator">
      <Display
        currDisplay={display}
        setDisplay={setDisplay}
        setDisplayFocused={setDisplayFocused}
      />
      <Controls display={display} handleClick={handleClick} />
    </div>
  );
};
