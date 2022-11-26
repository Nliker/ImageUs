import React, { useCallback } from 'react';
import { CgCloseO } from 'react-icons/cg';
import useSWR from 'swr';
import { Background, CloseBtn, Container, Wrapper } from './styles';

interface Props {
  children?: React.ReactNode;
  modalName: string;
}

const ModalLayout = ({ children, modalName }: Props) => {
  const { mutate: modalMutate } = useSWR(`${modalName === 'image_modal' ? 'showImageModal' : 'showUploadModal'}`);
  const onClickCloseModal = () => {
    modalMutate(false, false);
  };

  return (
    <Wrapper>
      <Background />
      <Container>
        <CloseBtn>
          <div onClick={onClickCloseModal}>
            <CgCloseO />
          </div>
        </CloseBtn>
        {children}
      </Container>
    </Wrapper>
  );
};

export default ModalLayout;
