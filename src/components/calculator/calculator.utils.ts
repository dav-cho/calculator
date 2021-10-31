export const checkValidInputValue = (keyButtonValue: string) => {
  const controls = ['=', 'Enter', 'Escape', 'Backspace', 'Delete'];

  const checkNumbers =
    (keyButtonValue >= '0' && keyButtonValue <= '9') || keyButtonValue === '.';
  const checkOperators = '+-*/'.includes(keyButtonValue);
  const checkParens = '()'.includes(keyButtonValue);
  const checkControls = controls.includes(keyButtonValue);

  return checkNumbers || checkOperators || checkParens || checkControls;
};
