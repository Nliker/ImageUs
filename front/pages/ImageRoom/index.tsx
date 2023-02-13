import ContentSection from '@components/ContentSection';
import AppLayout from '@layouts/AppLayout';
import React, { useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router';
import { ContentSectionWrapper } from './styles';

const ImageRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  console.log('룸 룸아이디:', roomId);

  return (
    <AppLayout isImageRoom>
      {/* 키를 줌으로서 룸아이디에 따라서 컴포넌트를 unmount 시키고 remount 시킬 수 있다. */}
      <ContentSectionWrapper>
        <ContentSection key={roomId} roomId={roomId} />
      </ContentSectionWrapper>
    </AppLayout>
  );
};

export default ImageRoom;
