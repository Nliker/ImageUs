import React, { useCallback, useEffect, useRef } from 'react';
import { CgCloseO } from 'react-icons/cg';
import useSWR from 'swr';
import { Background, CloseBtn, Container, Wrapper } from './styles';

interface Props {
  modalName: string;
  children?: React.ReactNode;
}

const ModalLayout = ({ children, modalName }: Props) => {
  const { data: modalState, mutate: mutateModalState } =
    useSWR('showModalState');
  const modalEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('click', onClickOuterModal);
    return () => {
      window.removeEventListener('click', onClickOuterModal);
    };
  }, [modalName]);

  const onClickOuterModal = (e: MouseEvent) => {
    console.log('클릭한 요소: ', e.target);
    if (
      e.target instanceof HTMLElement &&
      !modalEl.current?.contains(e.target)
    ) {
      mutateModalState({ ...modalState, [modalName]: false });
    }
  };

  const onClickCloseModal = () => {
    mutateModalState({ ...modalState, [modalName]: false });
  };

  return (
    <Wrapper>
      <Background />
      <CloseBtn>
        <div onClick={onClickCloseModal}>
          <CgCloseO />
        </div>
      </CloseBtn>
      <Container ref={modalEl}>{children}</Container>
    </Wrapper>
  );
};

export default ModalLayout;
