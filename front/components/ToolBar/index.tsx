import React, { useCallback, useState } from 'react';
import { BtnDiv, BtnSpan, SideBarButton, Wrapper } from './styles';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { RiListSettingsLine } from 'react-icons/ri';

interface Props {
  handleRoomListBtn: (e: any) => void;
}

const ToolBar = ({ handleRoomListBtn }: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <Wrapper>
      <div>
        {/* <SideBarButton>{isMobile && <MdOutlineSpaceDashboard onClick={handleRoomListBtn} />}</SideBarButton> */}
        <SideBarButton><MdOutlineSpaceDashboard onClick={handleRoomListBtn} /></SideBarButton>
      </div>
      {/* <BtnDiv>
        <BtnSpan>
          <IoPeopleCircleSharp />
        </BtnSpan>
      </BtnDiv> */}
      <div>
        <BtnSpan>
          <RiListSettingsLine />
        </BtnSpan>
      </div>
    </Wrapper>
  );
};

export default ToolBar;
