import React, { memo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { IoMdArrowDropright } from 'react-icons/io';
import { mutate } from 'swr';

import ActionButton from '@styles/ActiveButton';
import Spinner from '@styles/Spinner';
import CollapseListBox from '../CollapseListBox';
import { Collapse, CreateBtnBox, Subtitle, Wrapper } from './styles';

interface Props {
  roomlist?: { id: number; data: string }[];
  closeSidebar: () => void;
}

const ChannelList = memo(({ roomlist, closeSidebar }: Props) => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const [channelCollapse, setChannelCollapse] = useState<boolean>(true);

  const onClickRoom = useCallback((roomId: number) => {
    closeSidebar();
    navigate(`/room/${roomId}`);
  }, []);

  const toggleChannelCollapse = useCallback(
    () => setChannelCollapse((prev) => !prev),
    [],
  );

  if (!roomlist) return <Spinner />;

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
          <CollapseListBox
            data={roomlist}
            dataClickCallBack={onClickRoom}
            currentLoginId={roomId}
            boxInfo={{ boxName: 'channel' }}
          />
          <CreateBtnBox>
            <ActionButton
              onClickBtn={() => {
                mutate('modalState', { currentModalState: 'creatRoom' });
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
