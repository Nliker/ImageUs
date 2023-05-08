import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import useSWR, { mutate } from 'swr';

import { CgCloseO } from 'react-icons/cg';
import {
  Background,
  CloseBtn,
  Container,
  Content,
  HeaderTitle,
  Wrapper,
} from './styles';
import useModal from '@hooks/useModal';
import Scrollbars from 'react-custom-scrollbars-2';

export interface ISize {
  width: number;
  height: number;
}

interface IProps {
  currentModal: string;
  children: React.ReactNode;
  size: ISize;
}

type HeaderTitleObj = Record<string, string>;

const ModalLayout = ({ currentModal, size, children }: IProps) => {
  const { clearModalCache } = useModal();
  const modalEl = useRef<HTMLDivElement>(null);

  const initialSize = useMemo(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth * 0.8 < size.width) {
      const width = screenWidth * 0.8;
      const height = width * (size.height / size.width);

      return {
        width,
        height,
      };
    } else {
      return { ...size };
    }
  }, [size]);
  const [responsiveSize, setResponsiveSize] = useState(initialSize);

  const headerTitleList: HeaderTitleObj = {
    detailPicture: '클릭한 이미지 보기',
    upload: '사진 업로드하기',
    createRoom: '방 생성하기',
    inviteMember: '멤버 초대하기',
    alert: '알림창',
  };

  useEffect(() => {
    window.addEventListener('resize', handleModalSize);
    document.addEventListener('click', onClickOuterModal);
    return () => {
      window.removeEventListener('resize', handleModalSize);
      document.removeEventListener('click', onClickOuterModal);
    };
  }, []);

  // 화면 크기에 맞추어 모달 사이즈 조절
  // 모달 크기가 전체 화면의 80% 이상일 때 모달 width를 80%로 설정, height를 비율에 맞춰 설정
  const handleModalSize = useCallback(() => {
    const criterionWidth = window.innerWidth * 0.8;

    if (criterionWidth < 320) return;

    if (criterionWidth < size.width) {
      const width = criterionWidth;
      const height = criterionWidth * (size.height / size.width);

      setResponsiveSize((prev) => ({ ...prev, width, height }));
    } else {
      setResponsiveSize((prev) => ({ ...prev, ...size }));
    }
  }, [window.innerWidth]);

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
      {currentModal !== 'alert' && (
        <>
          <Background />
          <CloseBtn>
            <div
              onClick={() => {
                clearModalCache();
              }}
            >
              <CgCloseO />
            </div>
          </CloseBtn>
        </>
      )}
      <Container ref={modalEl} size={responsiveSize}>
        <HeaderTitle>{headerTitleList[currentModal]}</HeaderTitle>
        <Content>{children}</Content>
      </Container>
    </Wrapper>
  );
};

export default ModalLayout;
