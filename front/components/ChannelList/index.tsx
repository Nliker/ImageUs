import EachChannel from '@components/EachChannel';
import React, { useCallback, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { Collapse, Subtitle } from './styles';

const ChannelList = () => {
  const [channelCollapse, setChannelCollapse] = useState<boolean>(false);
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
    <>
      <Subtitle>
        <Collapse collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <IoMdArrowDropright />
        </Collapse>
        <span>Channels</span>
      </Subtitle>
      <div>
        {!channelCollapse &&
          channelData?.map((channel) => {
            return <EachChannel key={channel.id} channel={channel} />;
          })}
      </div>
    </>
  );
};

export default ChannelList;
