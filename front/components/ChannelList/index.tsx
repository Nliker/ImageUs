import EachChannel from '@components/EachChannel';
import getDataFetcher from '@utils/getUserRoomListFetcher';
import React, { useCallback, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import useSWR from 'swr';
import { Collapse, Container, Subtitle } from './styles';

const ChannelList = () => {
  const [channelCollapse, setChannelCollapse] = useState<boolean>(false);
  // const { data } = useSWR(`/user/${user_id}/roomlist`, getDataFetcher);
  // 임시 데이터
  const channelData = [
    {
      id: 1,
      name: '채널1',
    },
    {
      id: 2,
      name: '채널2',
    },
    {
      id: 3,
      name: '채널3',
    },
    {
      id: 4,
      name: '채널4',
    },
  ];

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
          channelData?.map((channel) => {
            return <EachChannel key={channel.id} channel={channel} />;
          })}
      </div>
    </Container>
  );
};

export default ChannelList;
