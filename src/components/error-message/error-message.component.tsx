import { useErrorMessageContext } from '../../contexts/error-message.context';

import { ReactComponent as ErrorIcon } from '../../assets/error-icon.svg';

import './error-message.styles.scss';

export const ErrorMessage = () => {
  const { errorMessage } = useErrorMessageContext();

  return (
    <div className="error-message">
      <ErrorIcon />
      <span>{errorMessage}</span>
    </div>
  );
};
