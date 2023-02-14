import ChannelList from '@components/ChannelList';
import MemberList from '@components/MemberList';
import React, {
  memo,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router';
import { Route, Routes } from 'react-router';
import useSWR, { useSWRConfig } from 'swr';
import {
  Background,
  ContentTabs,
  ContentWrapper,
  Tab,
  Wrapper,
} from './styles';

interface SidebarProps {
  show: boolean;
  close: () => void;
}

const SideBar = memo(({ show, close }: SidebarProps) => {
  const sideBarEl = useRef<HTMLDivElement>(null);
  const backgroundEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log(backgroundEl);
    backgroundEl.current?.addEventListener('click', handleCloseSidebar);
    return () => {
      backgroundEl.current?.removeEventListener('click', handleCloseSidebar);
    };
  }, [backgroundEl.current, show]);

  const handleCloseSidebar = useCallback(
    (e: MouseEvent) => {
      console.log('클로즈', backgroundEl);
      if (
        e.target instanceof HTMLElement &&
        !sideBarEl.current?.contains(e.target)
      ) {
        close();
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
                  <div className="tab_content_box">
                    <ChannelList closeSidebar={close} />
                  </div>
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
                  <div className="tab_content_box">
                    <MemberList />
                  </div>
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
