import React from 'react';
import { Background, CloseBtn, Container, ImageBox, Modal, ModalBox, ModalContainer, ModalHeader, ModalTitle, Wrapper } from './styles';
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
          <ModalBox>
            <Modal>
                <ModalHeader>
                    <ModalTitle>
                        <h1>자르기</h1>
                    </ModalTitle>
                </ModalHeader>
                <ImageBox>

                </ImageBox>
            </Modal>
          </ModalBox>
        </ModalContainer>
      </Container>
    </Wrapper>
  );
};

export default UploadModal;
