import { DRoomData } from '@typing/db';
import React, { memo, useCallback } from 'react';
import { NavLink, useLinkClickHandler, useNavigate } from 'react-router-dom';
import { ChannelDiv } from './styles';

interface Props {
  room: DRoomData;
  closeSidebar: () => void;
}

const EachChannel = memo(({ room, closeSidebar }: Props) => {
  const navigate = useNavigate();

  const onClickRoom = useCallback(() => {
    closeSidebar();
    navigate(`/booth/${room.id}`);
  }, [room]);

  return (
    <ChannelDiv onClick={onClickRoom}>
      <span># {room.title}</span>
    </ChannelDiv>
  );
});

export default EachChannel;
