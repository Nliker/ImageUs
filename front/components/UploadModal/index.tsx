import React from 'react';
import { Background, CloseBtn, Container, Modal, ModalContainer, Wrapper } from './styles';
import { CgCloseO } from 'react-icons/cg';

interface Props {
    onCloseModal: (e: any) => void; 
}

const UploadModal = ({ onCloseModal }: Props) => {
  return (
    <Wrapper>
      <Background />
      <Container>
        <CloseBtn>
          <div onClick={onCloseModal}>
              <CgCloseO />
          </div>
        </CloseBtn>
        <ModalContainer>
          <Modal></Modal>
        </ModalContainer>
      </Container>
    </Wrapper>
  );
};

export default UploadModal;
