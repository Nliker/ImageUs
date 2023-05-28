import React, { memo, useState, useContext } from 'react';

import { useNavigate, useOutletContext, useParams } from 'react-router';
import { IoMdArrowDropright } from 'react-icons/io';

import ActionButton from '@styles/ActiveButton';
import Spinner from '@styles/Spinner';
import useModal from '@hooks/useModal';
import { DataCheckLabel, DataLabel } from '@styles/DataCheckLabel/styles';
import SidebarContext from '@utils/SidebarContext';
import useRoomList from '@hooks/useRoomList';
import { Collapse, Container, CreateBtnBox, Subtitle, Wrapper } from './styles';
import { PrivateChildProps } from '@typing/client';

const ChannelList = memo(() => {
  // const userId = sessionStorage.getItem('user_id');
  const { userInfo, roomId } = useOutletContext<PrivateChildProps>();
  // const { roomId } = useParams<{ roomId: string }>();
  // if (!roomId) return null;

  const navigate = useNavigate();
  const sidebarContext = useContext(SidebarContext);
  const [channelCollapse, setChannelCollapse] = useState<boolean>(true);

  const { showCreateRoomModal } = useModal();
  const { refineRoomList } = useRoomList(userInfo.id);

  const toggleChannelCollapse = () => setChannelCollapse((prev) => !prev);
  const onClickDataLabel = (id: number) => () => {
    sidebarContext.setSidebarState(false);
    navigate(`/room/${id}`);
  };

  if (!roomId) return <Spinner />;

  return (
    <Wrapper>
      <Subtitle onClick={toggleChannelCollapse}>
        <Collapse collapse={channelCollapse}>
          <IoMdArrowDropright />
        </Collapse>
        <span>Channels</span>
      </Subtitle>
      {channelCollapse && (
        <>
          <Container>
            {refineRoomList.map((item) => {
              return (
                <div key={item.id} className="check_box">
                  <div className="check_label_box">
                    <DataCheckLabel
                      type="radio"
                      id={`channel_${item.id}`}
                      name={`radio-group-channel`}
                      defaultChecked={roomId === '' + item.id}
                      boxName={'channel'}
                    />
                    <DataLabel
                      htmlFor={`channel_${item.id}`}
                      onClick={onClickDataLabel(item.id)}
                    >
                      <span className="item_text">{item.title}</span>
                    </DataLabel>
                  </div>
                </div>
              );
            })}
          </Container>
          <CreateBtnBox>
            <ActionButton
              onClickBtn={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();

                showCreateRoomModal();
              }}
              btnTitle={'+'}
            />
          </CreateBtnBox>
        </>
      )}
    </Wrapper>
  );
});

export default ChannelList;
