import React, { memo, useCallback, useEffect, useRef, useContext } from 'react';

import { useParams } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars-2';

import ChannelList from './ChannelList';
import MemberList from './MemberList';
import SidebarContext from '@utils/SidebarContext';
import useRoomList from '@hooks/useRoomList';
import {
  Background,
  ContentTabs,
  ContentWrapper,
  Tab,
  Wrapper,
} from './styles';

interface SidebarProps {
  show: boolean;
}

const SideBar = memo(({ show }: SidebarProps) => {
  const userId = sessionStorage.getItem('user_id');
  if (!userId) return null;

  const sidebarContext = useContext(SidebarContext);

  const sideBarEl = useRef<HTMLDivElement>(null);
  const backgroundEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    backgroundEl.current?.addEventListener('click', handleCloseSidebar);
    return () => {
      backgroundEl.current?.removeEventListener('click', handleCloseSidebar);
    };
  }, [show]);

  const handleCloseSidebar = useCallback(
    (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !sideBarEl.current?.contains(e.target)
      ) {
        sidebarContext.setSidebarState(false);
      }
    },
    [show],
  );

  return (
    <>
      {show && <Background ref={backgroundEl} />}
      <Wrapper show={show} ref={sideBarEl}>
        <ContentWrapper>
          <ContentTabs>
            <Tab>
              <input
                type="radio"
                id="tab-1"
                name="tab-group-1"
                defaultChecked
              />
              <label className="tab_label" htmlFor="tab-1">
                방 목록
              </label>
              <div className="tab_content">
                <Scrollbars>
                  <ChannelList />
                </Scrollbars>
              </div>
            </Tab>
            <Tab>
              <input type="radio" id="tab-2" name="tab-group-1" />
              <label className="tab_label" htmlFor="tab-2">
                멤버목록
              </label>
              <div className="tab_content">
                <Scrollbars>
                  <MemberList />
                </Scrollbars>
              </div>
            </Tab>
          </ContentTabs>
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

export default SideBar;
