import React, { useEffect, useRef } from 'react';
import useSWR, { mutate } from 'swr';

import { CgCloseO } from 'react-icons/cg';
import { Background, CloseBtn, Container, Wrapper } from './styles';

interface Props {
  children: React.ReactNode;
}

const ModalLayout = ({ children }: Props) => {
  const { data: modalStateData } = useSWR('modalState');
  const currentModalState = modalStateData?.currentModalState;
  const modalEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('click', onClickOuterModal);
    return () => {
      window.removeEventListener('click', onClickOuterModal);
    };
  }, []);

  const onClickOuterModal = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      !modalEl.current?.contains(e.target)
    ) {
      mutate('modalState', { currentModalState: '' });
    }
  };

  if (!currentModalState) return null;

  return (
    <Wrapper>
      <Background
        style={
          currentModalState === 'alert'
            ? { backgroundColor: 'rgb(0 0 0 / 0%)' }
            : undefined
        }
      />
      {currentModalState !== 'alert' && (
        <>
          <CloseBtn>
            <div
              onClick={() => {
                mutate('modalState', { currentModalState: '' });
              }}
            >
              <CgCloseO />
            </div>
          </CloseBtn>
        </>
      )}
      <Container ref={modalEl}>{children}</Container>
    </Wrapper>
  );
};

export default ModalLayout;
