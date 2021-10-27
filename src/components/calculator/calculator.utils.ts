export const checkButtonValueType = (buttonValue: string) => {
  const operators = ['+', '-', '*', '/'];
  const parens = ['(', ')'];

  if (buttonValue >= '0' && buttonValue <= '9') {
    return 'number';
  }

  if (operators.includes(buttonValue)) {
    return 'operator';
  }

  if (buttonValue === '.') {
    return 'decimal';
  }

  if (parens.includes(buttonValue)) {
    return 'parens';
  }

  if (buttonValue === 'del') {
    return 'del';
  }

  if (buttonValue === 'clear') {
    return 'clear';
  }
}

export const checkValidInputString = (inputString: string) => {
  // TODO: validate input string for before setDisplay or setValidButton
}
