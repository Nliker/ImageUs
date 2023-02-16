import React, { memo, useCallback, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import useSWR from 'swr';
import { Collapse, Container, CreateBtnBox, Subtitle } from './styles';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import { DRoomData } from '@typing/db';
import { useNavigate } from 'react-router';
import CollapseListBox from '@components/CollapseListBox';
import { useParams } from 'react-router';
import ActionButton from '@styles/ActiveButton';
import Spinner from '@styles/Spinner';

interface Props {
  roomlist?: { id: number; data: string }[];
  closeSidebar: () => void;
}

const ChannelList = memo(({ roomlist, closeSidebar }: Props) => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const [channelCollapse, setChannelCollapse] = useState<boolean>(true);
  const { data: showModalState, mutate: showModalMutate } =
    useSWR('showModalState');

  const onClickRoom = useCallback((roomId: number) => {
    closeSidebar();
    navigate(`/booth/${roomId}`);
  }, []);

  const toggleChannelCollapse = useCallback(
    () => setChannelCollapse((prev) => !prev),
    [],
  );

  const onClickCreateRoomBtn = useCallback(() => {
    showModalMutate({
      ...showModalState,
      create_room: true,
    });
  }, [showModalState]);

  if (!roomlist) return <Spinner />;

  return (
    <Container>
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
            <ActionButton onClickBtn={onClickCreateRoomBtn} btnTitle={'+'} />
          </CreateBtnBox>
        </>
      )}
    </Container>
  );
});

export default ChannelList;
