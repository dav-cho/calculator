/**
 * Calculator algorithm/logic
 **/

const SYNTAX_ERROR = 'Syntax Error';
const INVALID_EXPRESSION_ERROR = 'Invalid Expression';
const UNMATCHED_PARENTHESIS_ERROR = 'Unmatched Parenthesis';
const EMPTY_PARENTHESIS_ERROR = 'Empty Parenthesis';

// Explicitly define return type of filterInput function
export type FilteredInput =
  | string[]
  | typeof SYNTAX_ERROR
  | typeof INVALID_EXPRESSION_ERROR
  | typeof UNMATCHED_PARENTHESIS_ERROR
  | typeof EMPTY_PARENTHESIS_ERROR;

/**
 * Parse the input string before sending for main calculation
 * - Handles *most errors to minimize illegal calculations
 **/
export const filterInput = (inputString: string): FilteredInput => {
  let inputArray = [];
  let currNum = ''; // holds values for next number to be added into inputArray
  let periodCount = 0;
  let parensCount = 0;

  // Iterate through every character of the string and handle each character one by one
  for (let i = 0; i < inputString.length; ++i) {
    const char = inputString[i];

    // Ignore spaces
    if (char === ' ') {
      continue;
    }

    // If current character is a number character (digits and/or '.') start building
    // currNum string in order to build the full integer/floating point number.
    if ((char >= '0' && char <= '9') || char === '.') {
      const prevChar = inputArray[inputArray.length - 1];

      if (prevChar === ')') {
        return SYNTAX_ERROR;
      }

      // Maintain a count of periods in currNum in order to prevent syntax errors with
      // too many decimals.
      if (char === '.') {
        if (periodCount) {
          return SYNTAX_ERROR;
        } else {
          periodCount++;
        }
      }

      currNum += char;
    }

    // Handle all other non-number characters
    else {
      // If there is a value stored in currNum, check to make sure it is a valid number string
      // and store it in the inputArray, then finally reset currNum to an empty string
      // to start building the next number string.
      if (currNum) {
        inputArray.push(currNum);
        currNum = '';
        periodCount = 0;
      }

      // Handle parenthesis
      if ('()'.includes(char)) {
        // If current char is an opening parenthesis, check the last element in inputArray,
        // if it is a number, return Syntax Error.
        // Always increment parensCount
        if (char === '(') {
          const prevChar = inputArray[inputArray.length - 1];

          if (!isNaN(Number(prevChar))) {
            return SYNTAX_ERROR;
          }

          parensCount++;
        } else if (char === ')') {
          // If current char is a closing parenthesis, decrement parensCount.
          parensCount--;

          // If parensCount drops below zero, we have more closing parenthesis than opening.
          if (parensCount < 0) {
            return UNMATCHED_PARENTHESIS_ERROR;
          }
        }

        inputArray.push(char);
      }

      // Handle all operators except subtraction
      else if ('+*/'.includes(char)) {
        const prevChar = inputArray[inputArray.length - 1];

        // If inputArray is empty or the previous char is an opening parenthesis,
        // return with Syntax Error
        if (!inputArray.length || prevChar === '(') {
          return SYNTAX_ERROR;
        }

        // If last elemeent in inputArray is not an operator or an opening parenthesis,
        // push character into inputArray
        else if (!'+-*/('.includes(prevChar)) {
          inputArray.push(char);
        }

        // Handle all other cases with Syntax Error
        else {
          return SYNTAX_ERROR;
        }
      }

      // Handle subtraction operator
      else if (char === '-') {
        // If inputArray is empty ('-' will be the first char) or the last element in inputArray
        // is an opening parenthesis ('-' will the first char after an opening parenthesis),
        // we can assume current '-' operator will function as a negative flag to a number.
        if (
          !inputArray.length ||
          (inputArray.length && inputArray[inputArray.length - 1] === '(')
        ) {
          currNum += '-';
        }

        // Count, in reverse, the number of consecutive operators in inputArray that
        // precede current '-' char.
        else {
          let operatorCount = 0;
          let j = inputArray.length - 1;

          // Since only two sequential operators are allowed, if operatorCount goes over 2,
          // we can end the search early
          while (
            j >= 0 &&
            '+-*/'.includes(inputArray[j]) &&
            operatorCount < 3
          ) {
            operatorCount++;
            j--;
          }

          // If preceding element is an operator, handle next number as a negative number
          if (operatorCount === 1) {
            currNum += '-';
          }

          // There are no previous operators, so we can append to inputArray as an operator
          else if (operatorCount === 0) {
            inputArray.push(char);
          }

          // Handle all other cases
          else {
            return SYNTAX_ERROR;
          }
        }
      }

      // Handle any other invalid characters
      else {
        return INVALID_EXPRESSION_ERROR;
      }
    }
  }

  // if parenthesis are not balanced, after iterating through entire string,
  // return with an Unmatched Parenthesis Error.
  if (parensCount) {
    return UNMATCHED_PARENTHESIS_ERROR;
  }

  // If there is a value leftover in currNum, add it to inputArray
  if (currNum) {
    inputArray.push(currNum);
  }

  return inputArray;
};

/**
 * Perform calculation from returned value of filterInput function
 **/
export const calculate = (inputString: string): number | FilteredInput => {
  const inputArray = filterInput(inputString);

  // If filterInput function is not an Array, we know an error was returned.
  if (typeof inputArray === 'string') {
    return inputArray;
  }

  // Store current number and previous operator in variables,
  // and all calculated numbers in a stack in order to handle operator precedence.
  const calculatedNums: number[] = [];
  let currNum = 0;
  let prevOperator = '+';
  let i = 0;

  // If there is only a single element in the inputArray, it must be a number so we can
  // return that number
  if (inputArray.length === 1) {
    return Number(inputArray[0]);
  }

  while (i < inputArray.length) {
    let currentElement = inputArray[i];

    // Handle numbers
    // If the current element is an integer or its length is greater than 1, we can assume
    // it is a number and update currNum to converted number type element.
    if (
      (currentElement >= '0' && currentElement <= '9') ||
      currentElement.length > 1
    ) {
      currNum = Number(currentElement);
    }

    // Handle parenthesis by building a sub expression from within the parenthesis and
    // call recursively to get evaluated subexpression
    else if (currentElement === '(') {
      let subExpression = '';
      let parensCount = 1;

      while (++i < inputArray.length && parensCount > 0) {
        if (inputArray[i] === '(') {
          parensCount++;
        }

        // if there is only one opening parenthesis, the subsequent closing parenthesis
        // will balance the subexpression
        else if (inputArray[i] === ')') {
          if (parensCount === 1) {
            break;
          }

          parensCount--;
        }

        subExpression += inputArray[i];
      }

      // Handles empty parenthesis '()'
      if (!subExpression) {
        return EMPTY_PARENTHESIS_ERROR;
      }

      const subExpressionResult = calculate(subExpression);

      // If the evaluated sub expression is a number, update currNum to that value
      if (typeof subExpressionResult === 'number') {
        currNum = subExpressionResult;
      }

      // if the evaluated sub expression is not a number, it must have returned an error
      else {
        return subExpressionResult;
      }

      // update currentElement to element at current index
      currentElement = inputArray[i];
    }

    // Handle operators based on prevOperator and currNum and/or last number from
    // the calculatedNums stack
    if ('+-*/'.includes(currentElement) || i === inputArray.length - 1) {
      switch (prevOperator) {
        // If prevOperator is '+', save currNum into stack for later evaluation
        case '+':
          calculatedNums.push(currNum);
          break;
        // If prevOperator is '-', save -currNum into stack for later evaluation
        case '-':
          calculatedNums.push(-currNum);
          break;
        // If operator is a '*' or '/', we can perform the operation based on currNum
        // and last number from stack, then push that new value into the stack.
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

  // The sum of all values in calculatedNums stack will give us the final result.
  const res = calculatedNums.reduce((totalSum, currNum) => totalSum + currNum);

  // Round the result to two (*for testing purposes - subject to change later)
  return Math.round((res + Number.EPSILON) * 100) / 100;
};
