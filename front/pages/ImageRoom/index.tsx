import React, { useRef, useState, memo } from 'react';
import { useParams } from 'react-router';

import { IconContext } from 'react-icons/lib';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import Scrollbars from 'react-custom-scrollbars-2';

import { Button } from '@styles/Button';
import RightSidebar from '@components/RightSidebar';
import ImageSection from '@pages/ImageRoom/Component/ImageSection';
import { useSidebar } from '@hooks/useSidebar';
import { ISelectTerm } from '@typing/client';

import { FilteringOption, MainContainer } from './styles';

const ImageRoom = () => {
  const { roomId } = useParams<{ roomId?: string }>();
  if (!roomId) return null;

  const { leftBarState, rightBarState, setLeftbarState } = useSidebar();

  const [filterTagName, setFilterTagName] = useState('전체 게시물');
  const [filterStateNum, setFilterStateNum] = useState(0);
  const [filterBoxState, setFilterBoxState] = useState(false);
  const [showSelectDateForm, setShowSelectDateForm] = useState(false);
  const [filterSelectTerm, setFilterSelectTerm] = useState<ISelectTerm>({
    startDate: '',
    endDate: '',
  });

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
      const { selectDate } = getDateString(new Date());

      setShowSelectDateForm(false);
      setFilterStateNum(1);
      setFilterTagName('오늘 게시물');
      setFilterSelectTerm((prev) => ({
        ...prev,
        startDate: selectDate,
        endDate: selectDate,
      }));
    } else if (targetElement.closest('#yesterday')) {
      const dateValue = new Date();
      dateValue.setDate(dateValue.getDate() - 1);
      const { selectDate } = getDateString(dateValue);

      setShowSelectDateForm(false);
      setFilterStateNum(2);
      setFilterTagName('어제 날짜');
      setFilterSelectTerm((prev) => ({
        ...prev,
        startDate: selectDate,
        endDate: selectDate,
      }));
    } else if (targetElement.closest('#selectDay')) {
      setShowSelectDateForm(true);
      setFilterTagName('날짜 선택');
    } else if (targetElement.closest('#default')) {
      setShowSelectDateForm(false);
      setFilterTagName('전체 게시물');
      setFilterStateNum(0);
      setFilterSelectTerm((prev) => ({ ...prev, startDate: '', endDate: '' }));
    }
    setFilterBoxState(false);
  };

  const onClickCertainPeriodFilterBtn = () => {
    const startDate = filterStartDateInputRef.current?.value;
    const endDate = filterEndDateInputRef.current?.value;

    if (!startDate || !endDate) {
      alert('날짜가 선택되지 않았습니다.');
      return;
    } else if (
      startDate === filterSelectTerm.startDate &&
      endDate === filterSelectTerm.endDate
    ) {
      setShowSelectDateForm(false);
      return;
    } else if (new Date(startDate) > new Date(endDate)) {
      alert('시작날이 마지막날보다 뒤따를 수 없습니다..');
      return;
    }

    setFilterStateNum(3);
    setFilterSelectTerm((prev) => ({ ...prev, startDate, endDate }));
    setShowSelectDateForm(false);
  };

  return (
    <>
      <MainContainer>
        {!leftBarState && (
          <div className="nav_icon" onClick={() => setLeftbarState(true)}>
            <IconContext.Provider
              value={{
                size: '30px',
                style: { color: 'rgba(0, 0, 0, 0.7)' },
              }}
            >
              <AiOutlineMenuUnfold />
            </IconContext.Provider>
          </div>
        )}
        <Scrollbars>
          <div className="inner_container">
            <div className="tool_box">
              <FilteringOption onClick={onClickFilteringItem}>
                <input type="checkbox" id="options-view-button" />
                <div id="select-button">
                  <div className="selected-value">
                    <span>{filterTagName}</span>
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
                      <span>날짜 선택</span>
                    </div>
                    <div className="option" id="default">
                      <span>전체 게시물</span>
                    </div>
                  </div>
                )}
              </FilteringOption>
              {showSelectDateForm && (
                <div className="select_date">
                  <div>
                    <div className="date_box">
                      <label>시작날</label>
                      <input type="date" ref={filterStartDateInputRef} />
                    </div>
                    <div className="date_box">
                      <label>마지막날</label>
                      <input type="date" ref={filterEndDateInputRef} />
                    </div>
                  </div>
                  <Button type="button" onClick={onClickCertainPeriodFilterBtn}>
                    확인
                  </Button>
                </div>
              )}
            </div>
            <div className="tag">
              <div className="tag_item">
                <span>
                  {filterStateNum === 3
                    ? `${filterSelectTerm.startDate} ~ ${filterSelectTerm.endDate}`
                    : filterTagName}
                </span>
              </div>
            </div>
            <div className="content_box">
              <ImageSection
                roomId={roomId}
                filteringData={{
                  isFilterMode: filterStateNum !== 0,
                  filterSelectTerm,
                }}
              />
            </div>
          </div>
        </Scrollbars>
      </MainContainer>
      <RightSidebar show={rightBarState} />
    </>
  );
};

export default memo(ImageRoom);
