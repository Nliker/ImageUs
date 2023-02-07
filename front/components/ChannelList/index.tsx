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

interface Props {
  closeSidebar: () => void;
}

const ChannelList = memo(({ closeSidebar }: Props) => {
  const { roomId } = useParams<{ roomId: string }>();
  const { data: roomlist, mutate: mutateRoomList } = useSWR(
    'roomlist',
    getUserRoomListFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const [channelCollapse, setChannelCollapse] = useState<boolean>(true);
  const navigate = useNavigate();
  const { data: showModalState, mutate: showModalMutate } =
    useSWR('showModalState');

  const onClickRoom = useCallback((roomId: number) => {
    // closeSidebar();
    navigate(`/booth/${roomId}`);
  }, []);

  const toggleChannelCollapse = useCallback(
    () => setChannelCollapse((prev) => !prev),
    [],
  );

  const collapseListBoxData = useCallback(() => {
    if (!roomlist) return [];
    const data = roomlist.map((room: DRoomData) => ({
      id: room.id,
      data: room.title,
    }));
    return [...data];
  }, [roomlist]);

  const onClickCreateRoomBtn = useCallback(() => {
    showModalMutate({
      ...showModalState,
      create_room: true,
    });
  }, [showModalState]);

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
            data={collapseListBoxData()}
            dataClickCallBack={onClickRoom}
            currentDataId={roomId}
            nameKey={'channel'}
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
