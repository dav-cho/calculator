import { useRef } from 'react';

import './nav.styles.scss';

interface NavProps {
  setHelpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Nav = ({ setHelpModalOpen }: NavProps) => {
  const helpLinkRef = useRef<HTMLAnchorElement>(null);

  const openHelpModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    setHelpModalOpen(true);
    helpLinkRef.current!.blur();
  };

  return (
    <>
      <div className="nav">
        <div className="title">
          <h1>calculator</h1>
        </div>
        <a href="/" ref={helpLinkRef} onClick={openHelpModal}>
          help
        </a>
      </div>
    </>
  );
};
