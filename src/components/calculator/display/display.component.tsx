import { useErrorMessageContext } from '../../../contexts/error-message.context';

import './display.styles.scss';

interface DisplayProps {
  currDisplay: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  setDisplayFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Display = ({
  currDisplay,
  setDisplay,
  setDisplayFocused,
}: DisplayProps) => {
  const { isInvalidExpression } = useErrorMessageContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let displayValue = event.target.value;

    setDisplay(displayValue);
  };

  const handleFocus = () => {
    setDisplayFocused(true);
  };

  const handleBlur = () => {
    setDisplayFocused(false);
  };

  return (
    <div className="display">
      <input
        type="text"
        value={currDisplay}
        className={isInvalidExpression ? 'invalid' : ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};
