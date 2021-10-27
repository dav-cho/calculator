import './button.styles.scss';

interface ButtonProps {
  name: string;
  value?: string | number;
  valid?: boolean;
  handleClick?: React.MouseEventHandler;
  // setDisplay?: React.Dispatch<React.SetStateAction<string>>;
}

export const Button = ({ name, valid, handleClick, ...otherProps }: ButtonProps) => {
  return (
    <button className={valid ? 'button valid' : 'button invalid'} onClick={handleClick} {...otherProps}>
      {name}
    </button>
  );
};
