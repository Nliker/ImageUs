import React, { useEffect, useRef } from 'react';
import useSWR, { mutate } from 'swr';

import { CgCloseO } from 'react-icons/cg';
import { Background, CloseBtn, Container, Wrapper } from './styles';
import useModal from '@hooks/useModal';

interface IProps {
  currentModal: string | null;
  children: React.ReactNode;
}

const ModalLayout = ({ currentModal, children }: IProps) => {
  const { clearModalCache } = useModal();
  const modalEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', onClickOuterModal);
    return () => {
      document.removeEventListener('click', onClickOuterModal);
    };
  }, []);

  const onClickOuterModal = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      !modalEl.current?.contains(e.target)
    ) {
      clearModalCache();
    }
  };

  if (!currentModal) return null;

  return (
    <Wrapper>
      <Background
        style={
          currentModal === 'alert'
            ? { backgroundColor: 'rgb(0 0 0 / 0%)' }
            : undefined
        }
      />
      {currentModal !== 'alert' && (
        <CloseBtn>
          <div
            onClick={() => {
              clearModalCache();
            }}
          >
            <CgCloseO />
          </div>
        </CloseBtn>
      )}
      <Container ref={modalEl}>{children}</Container>
    </Wrapper>
  );
};

export default ModalLayout;
