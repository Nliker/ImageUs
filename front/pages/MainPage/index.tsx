import ContentImageModal from '@components/ContentImageModal';
import ContentSection from '@components/ContentSection';
import AppLayout from '@layouts/AppLayout';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'swr';
import { ContentWrappper, Wrappper } from './styles';

const MainPage = () => {
  const { data: isLogIn } = useSWR('login');
  const navigate = useNavigate();
  console.log('main', isLogIn);
  useEffect(() => {
    if (!isLogIn) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, []);

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
