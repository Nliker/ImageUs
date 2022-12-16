import { IRoomData } from '@typing/db';
import React, { useCallback } from 'react';
import { NavLink, useLinkClickHandler, useNavigate } from 'react-router-dom';
import { ChannelDiv } from './styles';

const EachChannel = ({ room }: { room: IRoomData}) => {
  const navigate = useNavigate();

  const onClickRoom = useCallback(() => {
    navigate(`/main_page/${room.id}`);
  }, [room]);
  
  return (
    <ChannelDiv onClick={onClickRoom}>
      <span># {room.title}</span>
    </ChannelDiv>
  );
};

export default EachChannel;
