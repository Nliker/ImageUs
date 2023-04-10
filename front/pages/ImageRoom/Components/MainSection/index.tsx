import React, { useMemo, useRef, useState } from 'react';
import { mutate } from 'swr';

import { Scrollbars } from 'react-custom-scrollbars-2';
import { TbDoorExit } from 'react-icons/tb';
import { IconContext } from 'react-icons/lib';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';

import { Button } from '@styles/Button';
import { SidebarContext } from '@layouts/AppLayout';

import ImageSection from '../ImageSection';
import {
  ContentBox,
  ActiveContentBox,
  FilteringOption,
  MainContainer,
} from './styles';

export interface SelectTerm {
  startDate?: string;
  endDate?: string;
}

const MainSection = () => {
  const [filterBoxState, setFilterBoxState] = useState(false);
  const [filterName, setFilterName] = useState('전체 게시물');
  const [filterSelectTerm, setFilterSelectTerm] = useState<SelectTerm>();

  const filterStartDateInputRef = useRef<HTMLInputElement>(null);
  const filterEndDateInputRef = useRef<HTMLInputElement>(null);

  const getDateString = (dateValue: Date) => {
    const selectDate = `${dateValue.getFullYear()}-${
      dateValue.getMonth() + 1 >= 13 ? 0 : dateValue.getMonth() + 1
    }-${dateValue.getDate()}`;

    return { selectDate };
  };

  const onClickFilteringItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as HTMLDivElement;

    if (targetElement.closest('#options-view-button')) {
      setFilterBoxState((prev) => !prev);
      return;
    }

    if (targetElement.closest('#today')) {
      setFilterName('오늘 날짜');
      const { selectDate } = getDateString(new Date());

      setFilterSelectTerm({
        startDate: selectDate,
        endDate: selectDate,
      });
      setFilterBoxState(false);
    } else if (targetElement.closest('#yesterday')) {
      setFilterName('어제 날짜');
      const dateValue = new Date();
      dateValue.setDate(dateValue.getDate() - 1);
      const { selectDate } = getDateString(dateValue);

      setFilterSelectTerm({
        startDate: selectDate,
        endDate: selectDate,
      });
      setFilterBoxState(false);
    } else if (targetElement.closest('#selectDay')) {
      setFilterName('기간 선택');
      setFilterBoxState(false);
    } else if (targetElement.closest('#default')) {
      setFilterName('전체 게시물');
      setFilterSelectTerm(undefined);
      setFilterBoxState(false);
    }
  };

  const onClickCertainPeriodFilterBtn = () => {
    const startDate = filterStartDateInputRef.current?.value;
    const endDate = filterEndDateInputRef.current?.value;

    if (
      startDate === filterSelectTerm?.startDate &&
      endDate === filterSelectTerm?.endDate
    )
      return;

    if (!startDate || !endDate) {
      alert('날짜가 선택되지 않았습니다.');
      return;
    }

    setFilterSelectTerm({ startDate, endDate });
  };

  const onClickLeaveRoom = () => {
    const userId = sessionStorage.getItem('user_id');
    mutate('modalState', {
      currentModalState: 'alert',
      data: {
        content: '방에서 나가시겠습니까?',
        mutateKey: `/user/${userId}/room`,
      },
    });
  };

  const loadImgTypeInfo = useMemo(
    () => ({
      isfiltered: filterSelectTerm ? true : false,
      info: filterSelectTerm,
    }),
    [filterSelectTerm],
  );

  return (
    <Scrollbars>
      <section>
        <MainContainer>
          <ActiveContentBox>
            <div className="active_icon_box">
              <SidebarContext.Consumer>
                {({ setSidebarState }) => (
                  <div
                    className="sidebar_icon"
                    onClick={() => {
                      setSidebarState((prev) => !prev);
                    }}
                  >
                    <IconContext.Provider
                      value={{
                        size: '30px',
                        style: { display: 'inline-block' },
                      }}
                    >
                      <MdOutlineSpaceDashboard />
                    </IconContext.Provider>
                  </div>
                )}
              </SidebarContext.Consumer>
              <div className="leave_icon" onClick={onClickLeaveRoom}>
                <IconContext.Provider
                  value={{
                    size: '30px',
                    style: { display: 'inline-block' },
                  }}
                >
                  <TbDoorExit />
                </IconContext.Provider>
              </div>
            </div>
          </ActiveContentBox>

          <ContentBox>
            <div className="content_box_pos">
              <FilteringOption onClick={onClickFilteringItem}>
                <input type="checkbox" id="options-view-button" />
                <div id="select-button">
                  <div className="selected-value">
                    <span>{filterName}</span>
                  </div>
                  <div id="chevrons">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </div>
                {filterBoxState && (
                  <div className="options">
                    <div className="option" id="today">
                      <span>오늘 날짜</span>
                    </div>
                    <div className="option" id="yesterday">
                      <span>어제 날짜</span>
                    </div>
                    <div className="option" id="selectDay">
                      <span>기간 선택</span>
                    </div>
                    <div className="option" id="default">
                      <span>전체 게시물</span>
                    </div>
                  </div>
                )}
              </FilteringOption>
              {filterName === '기간 선택' && (
                <div className="select_box">
                  <div className="select_date">
                    <div className="select_date_c">
                      <label>시작날</label>
                      <input type="date" ref={filterStartDateInputRef} />
                    </div>
                    <div className="select_date_c">
                      <label>마지막날</label>
                      <input type="date" ref={filterEndDateInputRef} />
                    </div>
                    <div className="select_data_btn">
                      <Button
                        type="button"
                        onClick={onClickCertainPeriodFilterBtn}
                      >
                        확인
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <div className="tag">
                  <span>
                    {filterSelectTerm ? '필터링된 이미지' : '게시된 이미지'}
                  </span>
                </div>
              </div>
              <ImageSection loadImgTypeInfo={loadImgTypeInfo} />
            </div>
          </ContentBox>
        </MainContainer>
      </section>
    </Scrollbars>
  );
};

export default MainSection;
