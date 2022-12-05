import ContentImageModal from '@components/ContentImageModal';
import ContentSection from '@components/ContentSection';
import CreateRoomModal from '@components/CreateRoomModal';
import AppLayout from '@layouts/AppLayout';
import logInFetcher from '@utils/logInFetcher';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'swr';
import { ContentWrappper, Wrappper } from './styles';

const MainPage = () => {
  const { data: isLogIn } = useSWR('login', logInFetcher);

  console.log('main', isLogIn);

  return (
    <AppLayout>
      <Wrappper>
        <ContentWrappper>
          <ContentSection />
        </ContentWrappper>
      </Wrappper>
    </AppLayout>
  );
};

export default MainPage;
