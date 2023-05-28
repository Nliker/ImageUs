import React, { ReactNode } from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { Container } from './styles';

type Props = {
  children: ReactNode;
};

function NotFoundLayout({ children }: Props) {
  return (
    <Container>
      <div>
        <IconContext.Provider
          value={{
            size: '100px',
            style: { display: 'inline-block' },
          }}
        >
          <BsExclamationTriangle />
        </IconContext.Provider>
      </div>
      {children}
    </Container>
  );
}

export default NotFoundLayout;
