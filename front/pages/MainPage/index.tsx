import ContentImageModal from '@components/ContentImageModal';
import ContentSection from '@components/ContentSection';
import AppLayout from '@layouts/AppLayout';
import React, { useCallback, useState } from 'react';
import { ContentWrappper, Wrappper } from './styles';

const MainPage = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  // const onClickUserProfile = useCallback((e: { stopPropagation: () => void }) => {
  //   e.stopPropagation();
  //   setShowUserMenu((prev) => !prev);
  // }, []);

  const onLogout = useCallback(() => {
    //  axios 요청
    // axios
    //   .post('/api/users/logout', null, {
    //     withCredentials: true,
    //   })
    //   .then(() => {
    //     // mutate(false);
    //     revalidateUser();
    //   })
    //   .catch((error) => {
    //     console.dir(error);
    //     toast.error(error.response?.data, { position: 'bottom-center' });
    //   });
  }, []);
  
  const onShowImageModal = useCallback(() => {
    setShowImageModal(true);
  }, []);
  
  const onCloseImageModal = useCallback(() => {
    setShowImageModal(false);
  }, []);
  
  return (
    <AppLayout>
      <Wrappper>
        <ContentWrappper>
          <ContentSection onShowModal={onShowImageModal}/>
        </ContentWrappper>
      </Wrappper>
      {showImageModal && <ContentImageModal onCloseModal={onCloseImageModal} />}
    </AppLayout>
  );
};

export default MainPage;
