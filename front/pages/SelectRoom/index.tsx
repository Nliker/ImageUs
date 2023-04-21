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
import { IconContext } from 'react-icons/lib';
import { AiOutlinePlus } from 'react-icons/ai';
import useModal from '@hooks/useModal';

const SelectRoom = () => {
  const { setModal } = useModal();

  const handleCreateRoom = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setModal({ currentModal: 'createRoom' });
  };

  return (
    <AppLayout>
      <MainContainer>
        <div className="list_box">
          <header>
            <h1>
              방 목록
              <div className="create_btn" onClick={handleCreateRoom}>
                <IconContext.Provider value={{ size: '30px' }}>
                  <AiOutlinePlus />
                </IconContext.Provider>
              </div>
            </h1>
          </header>
          <Scrollbars>
            <Roomlist />
          </Scrollbars>
        </div>
      </MainContainer>
    </AppLayout>
  );
};

export default SelectRoom;
