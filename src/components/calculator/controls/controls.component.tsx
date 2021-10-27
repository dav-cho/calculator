import { Button } from '../button/button.component';

import './controls.styles.scss';

interface ControlsProps {
  valid: boolean;
  handleClick: React.MouseEventHandler;
  // setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

export const Controls = (props: ControlsProps) => {
  const buttons = [
    { name: '(', value: '(' },
    { name: ')', value: ')' },
    { name: '<-', value: 'del' },
    { name: 'AC', value: 'clear' },
    { name: '7', value: 7 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
    { name: '/', value: '/' },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '*', value: '*' },
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '-', value: '-' },
    { name: '0', value: 0 },
    { name: '.', value: '.' },
    { name: '=', value: '=' },
    { name: '+', value: '+' },
  ];

  return (
    <div className="controls">
      <div className="buttons-container">
        {buttons.map(({ name, value }) => (
          <Button key={name} name={name} value={value} {...props} />
        ))}
      </div>
    </div>
  );
};
