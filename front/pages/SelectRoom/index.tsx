import React from 'react';

import Scrollbars from 'react-custom-scrollbars-2';
import { IconContext } from 'react-icons/lib';
import { AiOutlinePlus } from 'react-icons/ai';

import AppLayout from '@layouts/AppLayout';
import useModal from '@hooks/useModal';

import Roomlist from './Components/Roomlist';
import { MainContainer } from './styles';

const SelectRoom = () => {
  const { showCreateRoomModal } = useModal();

  const handleCreateRoom = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    showCreateRoomModal();
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
