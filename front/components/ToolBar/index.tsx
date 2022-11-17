import React, { useCallback, useState } from 'react';
import { RoomButton, Wrapper } from './styles';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';

interface Props {
  handleRoomListBtn: (e: any) => void;
}

const ToolBar = ({ handleRoomListBtn }: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <Wrapper>
      <RoomButton>{isMobile && <MdOutlineSpaceDashboard onClick={handleRoomListBtn} />}</RoomButton>
    </Wrapper>
  );
};

export default ToolBar;
