import './display.styles.scss';

interface DisplayProps {
  currDisplay: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

export const Display = ({ currDisplay, setDisplay }: DisplayProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: validate input before setDisplay?
    // or allow invalid inputs and throw error message when calculating
    setDisplay(e.target.value);
  }

  return (
    <div className="display">
      <input type="text" value={currDisplay} onChange={handleChange} />
    </div>
  );
};
