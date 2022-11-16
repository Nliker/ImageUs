import RoomList from '@components/RoomList';
import AppLayout from '@layouts/AppLayout';
import React, { useCallback, useState } from 'react';
import { ContentWrappper, Wrappper } from './styles';

const MainPage = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
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
  console.log(showUserMenu);
  return (
    <AppLayout>
      <Wrappper>
        <RoomList />
        <ContentWrappper></ContentWrappper>
      </Wrappper>
    </AppLayout>
  );
};

export default MainPage;
