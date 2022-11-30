import React, { useCallback, useState } from 'react';
import { LeftIcon, RightIcons, Wrapper } from './styles';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { RiListSettingsLine } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';

interface Props {
  handleRoomListBtn: (e: any) => void;
}

const ToolBar = ({ handleRoomListBtn }: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <Wrapper>
      <LeftIcon>
        {/* <SideBarButton>{isMobile && <MdOutlineSpaceDashboard onClick={handleRoomListBtn} />}</SideBarButton> */}
        <span>
          <MdOutlineSpaceDashboard onClick={handleRoomListBtn} />
        </span>
      </LeftIcon>
      <RightIcons>
        <div>
          <span>
            <RiListSettingsLine />
          </span>
        </div>
        <div>
          <span>
            <BiUserCircle />
          </span>
        </div>
      </RightIcons>
    </Wrapper>
  );
};

export default ToolBar;
