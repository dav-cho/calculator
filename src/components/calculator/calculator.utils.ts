export const checkValidInputValue = (keyButtonValue: string) => {
  const controls = ['=', 'Enter', 'Escape', 'Backspace', 'Delete'];
  const checkControls = controls.includes(keyButtonValue);
  const checkParens = '()'.includes(keyButtonValue);
  const checkOperators = '+-*/'.includes(keyButtonValue);
  const checkNumbers =
    (keyButtonValue >= '0' && keyButtonValue <= '9') || keyButtonValue === '.';

  return checkNumbers || checkOperators || checkParens || checkControls;
};
