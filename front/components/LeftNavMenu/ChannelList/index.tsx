import React, { memo, useState } from 'react';

import { IoMdArrowDropright } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

import useModal from '@hooks/useModal';
import useRoomList from '@hooks/useRoomList';
import { IconContext } from 'react-icons/lib';
import { AiOutlinePlus } from 'react-icons/ai';
import { useUserInfo } from '@hooks/useUserInfo';
import { Collapse, Container, Subtitle, Wrapper } from './styles';

const ChannelList = memo(() => {
  const { showCreateRoomModal } = useModal();
  const { userInfo } = useUserInfo();
  const { refineRoomList } = useRoomList(userInfo.id);

  const [channelCollapse, setChannelCollapse] = useState<boolean>(true);

  const toggleChannelCollapse = () => setChannelCollapse((prev) => !prev);

  return (
    <Wrapper>
      <Subtitle>
        <div className="toggle_channel" onClick={toggleChannelCollapse}>
          <Collapse collapse={channelCollapse}>
            <IconContext.Provider value={{ size: '20px' }}>
              <IoMdArrowDropright />
            </IconContext.Provider>
          </Collapse>
          <span>Channels</span>
        </div>
        <div
          className="create_room_btn"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            showCreateRoomModal();
          }}
        >
          <IconContext.Provider value={{ size: '100%' }}>
            <AiOutlinePlus />
          </IconContext.Provider>
        </div>
      </Subtitle>
      {channelCollapse && (
        <Container>
          {refineRoomList.length !== 0 ? (
            refineRoomList.map((item) => {
              return (
                <div key={item.id}>
                  <NavLink
                    to={`/room/${item.id}`}
                    className={({ isActive }) =>
                      isActive ? 'active check_box' : 'check_box'
                    }
                  >
                    {item.title}
                  </NavLink>
                </div>
              );
            })
          ) : (
            <div className="no_room">
              <span>등록된 방이 없습니다.</span>
            </div>
          )}
        </Container>
      )}
    </Wrapper>
  );
});

export default ChannelList;
