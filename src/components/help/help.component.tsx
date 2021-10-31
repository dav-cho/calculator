import { SetStateAction, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './help.styles.scss';

interface HelpProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const Help = ({ isOpen, setIsOpen }: HelpProps) => {
  const closeModal = (event: React.MouseEvent | KeyboardEvent) => {
    event.preventDefault();
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', closeModal);
    }

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="help-container" onClick={closeModal}>
      <div className="help">
        <h1>Help</h1>
        <h3>Instructions:</h3>
        <ol>
          <li>
            Use the buttons or your keyboard to type an expression
            <ul>
              <li>Press "Backspace" to delete the last character</li>
              <li>Press "Escape" to clear the display</li>
              <li>You can also copy/paste an expression into the display</li>
            </ul>
          </li>
          <li>Type or press "=" or press enter to evaluate the expression</li>
        </ol>
        <h3>Valid Operations:</h3>
        <ul>
          <li>Addition: "+"</li>
          <li>Subtraction: "-"</li>
          <li>Multiplication: "*"</li>
          <li>Division: "/"</li>
        </ul>
        <h3>General Syntax Rules:</h3>
        <ul>
          <li>Valid numbers include whole numbers and decimals</li>
          <li>Input must be a valid mathematical expression</li>
          <li>Must have an equal number of opening and closing parenthesis</li>
          <li>
            Only two operators in sequence where the second operator is a "-"
          </li>
        </ul>
      </div>
    </div>,
    document.getElementById('modal')!
  );
};
