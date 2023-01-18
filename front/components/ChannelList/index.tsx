import EachChannel from '@components/EachChannel';
import React, { memo, useCallback, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import useSWR from 'swr';
import { Collapse, Container, Subtitle } from './styles';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import { DRoomData } from '@typing/db';

interface Props {
  closeSidebar: () => void;
}

const ChannelList = memo(({ closeSidebar }: Props) => {
  const { data: roomlist, mutate: mutateRoomList } = useSWR('roomlist', getUserRoomListFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [channelCollapse, setChannelCollapse] = useState<boolean>(false);
  const toggleChannelCollapse = useCallback(() => setChannelCollapse((prev) => !prev), []);

  return (
    <Container>
      <Subtitle onClick={toggleChannelCollapse}>
        <Collapse collapse={channelCollapse}>
          <IoMdArrowDropright />
        </Collapse>
        <span>Channels</span>
      </Subtitle>
      <div>
        {channelCollapse &&
          roomlist?.map((room: DRoomData) => {
            return <EachChannel key={room.id} room={room} closeSidebar={closeSidebar} />;
          })}
      </div>
    </Container>
  );
});

export default ChannelList;
