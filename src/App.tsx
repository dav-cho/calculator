import { useState } from 'react';

import { useErrorMessageContext } from './contexts/error-message.context';

import { Nav } from './components/nav/nav.component';
import { Calculator } from './components/calculator/calculator.component';
import { ErrorMessage } from './components/error-message/error-message.component';
import { Help } from './components/help/help.component';

import './App.scss';

function App() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const { isInvalidExpression } = useErrorMessageContext();

  return (
    <div className="App">
      <Nav setHelpModalOpen={setHelpModalOpen} />
      <Calculator helpModalOpen={helpModalOpen} />
      {isInvalidExpression ? <ErrorMessage /> : null}
      <Help isOpen={helpModalOpen} setIsOpen={setHelpModalOpen} />
    </div>
  );
}

export default App;
