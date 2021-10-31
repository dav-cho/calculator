/**
 * Calculator logic
 **/

/**
 * Parse input into an array for handling in calculate function
 **/
export type FilteredInput =
  | string[]
  | 'Syntax Error'
  | 'Invalid Expression'
  | 'Unmatched Parenthesis'
  | '';

export const filterInput = (inputString: string): FilteredInput => {
  let inputArray = [];
  let currNum = ''; // holds values for next number to be added into inputArray
  let periodCount = 0;
  let parensCount = 0;

  for (let i = 0; i < inputString.length; ++i) {
    const char = inputString[i];

    if (char === ' ') {
      continue;
    }

    // Builds the full number
    if ((char >= '0' && char <= '9') || char === '.') {
      if (inputArray[inputArray.length - 1] === ')') {
        return 'Syntax Error';
      }

      if (char === '.') {
        if (periodCount) {
          return 'Syntax Error';
        } else {
          periodCount++;
        }
      }

      currNum += char;
    } else {
      // If there is a value stored in currNum, check to make sure it's a valid number string
      // and store it in inputArray and reset currNum
      if (currNum) {
        inputArray.push(currNum);
        currNum = '';
        periodCount = 0;
      }

      // Handle parenthesis
      if ('()'.includes(char)) {
        if (char === '(') {
          const prevChar = inputArray[inputArray.length - 1];

          if (!isNaN(Number(prevChar))) {
            return 'Syntax Error';
          }

          parensCount++;
        } else if (char === ')') {
          parensCount--;

          if (parensCount < 0) {
            return 'Unmatched Parenthesis';
          }
        }

        inputArray.push(char);
      }
      // Handle operators except subtraction
      else if ('+*/'.includes(char)) {
        const prevChar = inputArray[inputArray.length - 1];

        if (!inputArray.length || prevChar === '(') {
          return 'Syntax Error';
        } else if (!'+-*/('.includes(prevChar)) {
          // If last elemeent in inputArray is not an operator or opening parenthesis
          inputArray.push(char);
        } else {
          return 'Syntax Error';
        }
      }
      // Handle subtraction operator
      else if (char === '-') {
        if (
          !inputArray ||
          (inputArray && inputArray[inputArray.length - 1] === '(')
        ) {
          // If it's the first character or last element in inputArray is an opening
          // parenthesis, handle the next number as a negative number
          currNum += '-';
        } else {
          // Count the number of consecutive operators in inputArray that precede current char
          let operatorCount = 0;
          let j = inputArray.length - 1;

          while (
            j >= 0 &&
            '+-*/'.includes(inputArray[j]) &&
            operatorCount < 3
          ) {
            operatorCount++;
            j--;
          }

          if (operatorCount === 1) {
            // If preceding element is an operator, handle next number as a negative number
            currNum += '-';
          } else if (operatorCount === 0) {
            // No previous operators and not the first character or the first character
            // after an opening parenthesis - Append to inputArray as an operator
            inputArray.push(char);
          } else {
            return 'Syntax Error';
          }
        }
      }
      // Handle any other invalid character
      else {
        // Current character does not match any valid characters
        return 'Invalid Expression';
      }
    }
  }

  // if parenthesis are not balanced, return syntax error
  if (parensCount) {
    return 'Unmatched Parenthesis';
  }

  // if there is a value leftover in currNum, add it to inputArray
  if (currNum) {
    inputArray.push(currNum);
  }

  return inputArray;
};

/**
 * Perform calculation from string input
 **/
// export const calculate = (inputString: string): number => {
export const calculate = (inputString: string): number | FilteredInput => {
  const inputArray = filterInput(inputString);

  if (typeof inputArray === 'string') {
    return inputArray;
  }

  // store calculated numbers in a stack and current number and previous operator
  // in order to handle operator precedence
  const calculatedNums: number[] = [];
  let currNum = 0;
  let prevOperator = '+';
  let i = 0;

  if (inputArray.length === 1) {
    return +inputArray[0];
  }

  while (i < inputArray.length) {
    let currentElement = inputArray[i];

    if (
      (currentElement >= '0' && currentElement <= '9') ||
      currentElement.length > 1
    ) {
      currNum = +currentElement;
    } else if (currentElement === '(') {
      // Buiild and evaluate a sub expression to handle parenthesis
      let subExpression = '';
      let parensCount = 1;

      while (++i < inputArray.length && parensCount > 0) {
        if (inputArray[i] === '(') {
          parensCount++;
        } else if (inputArray[i] === ')') {
          if (parensCount === 1) {
            break;
          }

          parensCount--;
        }

        subExpression += inputArray[i];
      }

      if (!subExpression) {
        return '';
      }

      const subExpressionResult = calculate(subExpression);

      if (typeof subExpressionResult === 'number') {
        currNum = subExpressionResult;
      } else {
        return subExpressionResult;
      }

      currentElement = inputArray[i];
    }

    if ('+-*/'.includes(currentElement) || i === inputArray.length - 1) {
      // perform operation based on prevOperator and current number or previous number in
      // calculatedNums stack
      switch (prevOperator) {
        case '+':
          calculatedNums.push(currNum);
          break;
        case '-':
          calculatedNums.push(-currNum);
          break;
        case '*':
          calculatedNums.push(calculatedNums.pop()! * currNum);
          break;
        case '/':
          calculatedNums.push(calculatedNums.pop()! / currNum);
          break;
      }

      prevOperator = currentElement;
      currNum = 0;
    }

    i++;
  }

  const res = calculatedNums.reduce((totalSum, currNum) => totalSum + currNum);

  return Math.round((res + Number.EPSILON) * 100) / 100;
};
