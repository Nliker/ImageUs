import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { MainContainer } from './styles';
import AppLayout from '@layouts/AppLayout';
import Roomlist from './Components/Roomlist';
import { IconContext } from 'react-icons/lib';
import { AiOutlinePlus } from 'react-icons/ai';
import useModal from '@hooks/useModal';

const SelectRoom = () => {
  const { setModalType } = useModal();

  const handleCreateRoom = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setModalType('createRoom');
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
