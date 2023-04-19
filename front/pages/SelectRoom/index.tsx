import React, { CSSProperties, useEffect } from 'react';
import useSWR from 'swr';
import ActionButton from '@styles/ActiveButton';
import { DRoomData } from '@typing/db';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import Scrollbars from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';
import { mutate } from 'swr';
import { MainContainer } from './styles';
import useRoomlist from '@hooks/useRoomlist';
import Spinner from '@styles/Spinner';
import AppLayout from '@layouts/AppLayout';
import Roomlist from './Components/Roomlist';

const SelectRoom = () => {
  return (
    <AppLayout>
      <Scrollbars>
        <MainContainer>
          <h1>그룹 목록</h1>
          <Roomlist />
        </MainContainer>
      </Scrollbars>
    </AppLayout>
  );
};

export default SelectRoom;
