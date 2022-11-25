import React from 'react';
import { CgCloseO } from 'react-icons/cg';
import { Background, CloseBtn, Container, Wrapper } from './styles';

interface Props {
  onCloseModal: (e: any) => void;
  children?: React.ReactNode;
}

const ModalLayout = ({ children, onCloseModal }: Props) => {
  return (
    <Wrapper>
      <Background />
      <Container>
        <CloseBtn>
          <div onClick={onCloseModal}>
            <CgCloseO />
          </div>
        </CloseBtn>
        {children}
      </Container>
    </Wrapper>
  );
};

export default ModalLayout;
