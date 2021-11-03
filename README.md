# Simple Calculator App

## Description

A simple calculator app with buttons and keyboard control that takes input as a string and evaluates the expression.

## Technologies Used

- HTML
- Sass
- React with Typescript
- Create React App
- Node version: 14.18.0

A list of dependencies can be found in the `package.json` file, found [here](https://github.com/dav-cho/calculator/blob/main/package.json)

## Usage Instructions

### Web:

[Simply click here for the Live App](https://dav-cho.github.io/calculator/)

or

### Local:

1. Clone this repository then run `npm install` or `yarn install` to install all dependencies.

2. In your terminal, run `npm start` or `yarn start` to start the Create React App local server.

## Code Review

The brunt of the code for ths project is found in the `calculator.ts` file which holds the algorithm for parsing the input string and performing calculations.

There are two functions in that file, `filterInput()` and `calculate()`. I chose to seperate the logic into these two separate functions in order to simplify the actual evaluation and to allow for more flexibility/control when handling errors.

### filterInput()

The base logic involves iterating through every character in the input string and evaluating based on two conditions:

1. If it is a number character (0-9 or .)
2. Any other character

- Spaces are not valid characters, but they are simply ignored by continuing passed them.

#### 1. The character is a number character

If the character is a number character, it can be handled as an individual character and simply pushed into the returned `inputArray`. However, because the number could be more than one digit, or have a decimal, if the number character is immediately pushed into the retuned array, we will have to build out the number in the `calculate()` function in a similar fashion. To make evaluation easier and to account for syntax errors before evaluation, the number is built out before appending to the returned `inputArray`.

```typescript
if ((char >= '0' && char <= '9') || char === '.') {
  const prevChar = inputArray[inputArray.length - 1];

  if (prevChar === ')') {
    return SYNTAX_ERROR;
  }

  if (char === '.') {
    if (periodCount) {
      return SYNTAX_ERROR;
    } else {
      periodCount++;
    }
  }

  currNum += char;
}
```

#### 2. Current Character Is Not a Number Character

All other cases in which the current character is not a number character are handled in an `else` statement.

First, we have to check whether there is a value stored in `currNum`, the number string that was previous built. If there is a value, then the building stops and we can push the whole string into the returned `inputArray`.  
Then we can handle cases for when the current character is either a parenthesis or an operator. All other characters will throw an error.

##### Parentheses

Parentheses are handled by the `parensCount` variable. `parensCount` is incremented by 1 for every opening parenthesis and decremented for every closing parenthesis. If the value ever drops below zero, we have too many closing parentheses. We check for too many opening parenthesis after iterating through the entire string and checking whether `parensCount` is greater than 0.

We always append the character into the `inputArray` except if the current character is an opening parenthesis and the last element in `inputArray` is a number.

```typescript
if ('()'.includes(char)) {
  if (char === '(') {
    const prevChar = inputArray[inputArray.length - 1];

    if (!isNaN(Number(prevChar))) {
      return SYNTAX_ERROR;
    }

    parensCount++;
  } else if (char === ')') {
    parensCount--;

    if (parensCount < 0) {
      return UNMATCHED_PARENTHESIS_ERROR;
    }
  }

  inputArray.push(char);
}
```

##### Addition, Multiplication and Division Operators

Addition, multiplication and division operators are handled seperately from the subtraction operator due to the constraint that sequential operators are allowed only if the second operator is a subtraction operator ('-').

These operators are only valid if they follow a number or closing parenthesis.

```typescript
else if ('+*/'.includes(char)) {
  const prevChar = inputArray[inputArray.length - 1];

  if (!inputArray.length || prevChar === '(') {
    return SYNTAX_ERROR;
  }

  else if (!'+-*/('.includes(prevChar)) {
    inputArray.push(char);
  }

  else {
    return SYNTAX_ERROR;
  }
}
```

##### Subtraction Operator

The subtraction operator is unique because, as per the contraints, it can be chained behind another operator. To handle this, we treat the subtraction operator as either an operator, or a negative flag for a number. This way, there will be no sequential operators passed into `inputArray` and then the `calculate()` function.

First, we check if there are any values in `inputArray` or if the last element in `inputArray` is an opening parenthesis. In this case, the operator becomes a negative flag for the next number.

```typescript
else if (char === '-') {
  if (
    !inputArray.length ||
    (inputArray.length && inputArray[inputArray.length - 1] === '(')
  ) {
    currNum += '-';
  }
```

If the operator is not the first character or the first character after an opening parenthesis, then a count is initialized in order to tally the number of sequential operators that are present in `inputArray`.

If the last element in `inputArray` is an operator (`operatorCount === 1`), then current operator becomes a negative flag for the next number.

```typescript
  else {
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
      currNum += '-';
    }
```

Otherwise, if there are no previous sequential operators, we treat the current operator as a subtraction operator

```typescript
    else if (operatorCount === 0) {
      inputArray.push(char);
    }

    else {
      return SYNTAX_ERROR;
    }
  }
}
```

#### Return

After iterating through all values of the current string, if there are unbalanced parenthesis then `parensCount` will not be equal to `0` and we return an Unmatched Parenthesis Error.

```typescript
if (parensCount) {
  return UNMATCHED_PARENTHESIS_ERROR;
}
```

If there is a value remaining in `currNum`, that means the last elements of the input string were number characters and we haven't yet had a chance to append this built out string into `inputArray`, so we append here after the loop has finished.

```typescript
if (currNum) {
  inputArray.push(currNum);
}
```

Finally, we return all the filtered input elements as an array to be handled by the `calculate()` function.

### calculate()

The `calculate()` function handles the core of the logic involved in evaluating the given expression. First we parse the input string through the `filterInput()` function which gives an array of string representations of:

- whole or decimal numbers
- operators
- parentheses

OR:

`filterInput()` will return an error as a string representation of the error message which we use to display in the `ErrorMessage` componenet.  
If `filterInput()` returns a string, we know that it was an error message and we can return immediately.

```typescript
const inputArray = filterInput(inputString);

// If filterInput function is not an Array, we know an error was returned.
if (typeof inputArray === 'string') {
  return inputArray;
}
```

#### Base Algorithm

The base algorithm involves iterating over every element in `inputArray` and handling each case depending on whether it is a:

1. Number
2. Parentheses
3. Operator

Variables `currNum` and `prevOperator` are initalized before the iteration to store necessary values in order to handle operator precedence.

##### Current element is a number

If the element is a number string, we simply convert it into a number type and update `currNum`.

```typescript
if (
  (currentElement >= '0' && currentElement <= '9') ||
  currentElement.length > 1
) {
  currNum = Number(currentElement);
}
```

##### Current element is an opening parenthesis

Since parentheses are always handle first, if we encounter an opening parenthesis, a sub-expression is built from the values within the parenthesis and `calculate()` is recursively called. `currNum` is then updated with the returned value of the sub-expression.

A count of parenthesis is initiated in order to track that the number of opening and closing parenthesis are balanced. Since this value is initialized with a value of 1, when we encounter a closing parenthesis, we decrement to 0, and the `while` loop breaks early since the sub-expression is complete. This is essentially our base case for the recursive call.

```typescript
else if (currentElement === '(') {
  let subExpression = '';
  let parensCount = 1;

  while (++i < inputArray.length && parensCount > 0) {
    if (inputArray[i] === '(') {
      parensCount++;
    }

    else if (inputArray[i] === ')') {
      if (parensCount === 1) {
        break;
      }

      parensCount--;
    }

    subExpression += inputArray[i];
  }

  if (!subExpression) {
    return EMPTY_PARENTHESIS_ERROR;
  }

  const subExpressionResult = calculate(subExpression);
```

If the return value from the recursive call of the subexpression to `calculate()` is not a number, then we know it returned an error and we can return that error for use later in the `ErrorMessage` component.

```typescript
  if (typeof subExpressionResult === 'number') {
    currNum = subExpressionResult;
  }

  else {
    return subExpressionResult;
  }

  currentElement = inputArray[i];
}
```

##### Current element is an operator

In order to handle order of operations, we have `currNum` and `prevOperator` variables. Once we encounter an operator character as the current element in our iteration, these variables become useful for determining the next course of action.

For addition and subtraction operators, since they have lower precedence than multiplication and division, the value stored in `currNum` is appended to the `calculatedNums` stack for use later. Then, `prevOperator` is updated to the current element and `currNum` is reset to 0;

For multiplication and division operators, we can simply perform the operation based on the current number, `currNum`, and the last number in our stack, `calculatedNums.pop()`. The result is then appended to the stack.

```typescript
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
```

##### Return

After iterating over all the elements, we are left with `calculatedNums`, which holds all the values of the performed operations. We simply need to sum all these values to get the final result.

```typescript
const res = calculatedNums.reduce((totalSum, currNum) => totalSum + currNum);
```
