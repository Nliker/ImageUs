import React, { useCallback } from 'react';
import { CgCloseO } from 'react-icons/cg';
import useSWR from 'swr';
import { Background, CloseBtn, Container, Wrapper } from './styles';

interface Props {
  children?: React.ReactNode;
}

const ModalLayout = ({ children }: Props) => {
  const { mutate: showModalMutate } = useSWR('showModalState');

  const onClickCloseModal = () => {
    showModalMutate({
      upload: false,
      image: false,
      create_room: false
    });
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
