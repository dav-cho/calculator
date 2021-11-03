import { useState, createContext, useContext } from 'react';

type ErrorMessageContextProps = {
  isInvalidExpression: boolean;
  setIsInvalidExpression: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ErrorMessageContext = createContext<ErrorMessageContextProps>({
  isInvalidExpression: false,
  setIsInvalidExpression: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
});

// Custom hook to access context values
// Have one import 'useErrorMessageContext' instead of two imports:
// - 'useContext and ErrorMessageContext'
export const useErrorMessageContext = () => useContext(ErrorMessageContext);

// Wrapper component to provide context to childr components
export const ErrorMessageContextProvider = ({ children }: any) => {
  const [invalidExpression, setInvalidExpression] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <ErrorMessageContext.Provider
      value={{
        isInvalidExpression: invalidExpression,
        setIsInvalidExpression: setInvalidExpression,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </ErrorMessageContext.Provider>
  );
};
