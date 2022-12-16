import EachChannel from '@components/EachChannel';
import React, { useCallback, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import useSWR from 'swr';
import { Collapse, Container, Subtitle } from './styles';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import { IRoomData } from '@typing/db';

const ChannelList = () => {
  const { data: roomlist, mutate: mutateRoomList } = useSWR('roomlist', getUserRoomListFetcher, {
    dedupingInterval: 2000
  })
  const [channelCollapse, setChannelCollapse] = useState<boolean>(false);
  const toggleChannelCollapse = useCallback(() => setChannelCollapse((prev) => !prev), []);
  // console.log(roomlist);

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
          roomlist?.map((room: IRoomData) => {
            return <EachChannel key={room.id} room={room} />;
          })}
      </div>
    </Container>
  );
};

export default ChannelList;
