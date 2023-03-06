import React, { useEffect, useRef, useState } from 'react';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import Scrollbars from 'react-custom-scrollbars';
import { TbDoorExit } from 'react-icons/tb';
import { IconContext } from 'react-icons/lib';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';

import useIntersect from '@hooks/useIntersect';
import { CImageData } from '@typing/client';
import {
  getDefaultImgFetcher,
  getFilterImgFetcher,
  getImageData,
  getUnreadImageList,
} from '@utils/roomDataFetcher';
import { Button } from '@styles/Button';
import Spinner from '@styles/Spinner';
import { SidebarContext } from '@layouts/AppLayout';

import ImageContentList from '../ImageContentList';
import {
  ContentBox,
  ActiveContentBox,
  FilteringOption,
  MainContainer,
} from './styles';

interface SelectTerm {
  startDate?: string;
  endDate?: string;
}

const ContentSection = ({ roomId }: { roomId?: string }) => {
  const { data: realTimeImageList } = useSWR(
    `/room/${roomId}/unread-imagelist`,
    getUnreadImageList,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      refreshInterval: 100000,
    },
  );
  const { data: postedImage, mutate: mutatePostedImage } = useSWR<CImageData[]>(
    `/image/${roomId}`,
    {
      fallbackData: [],
    },
  );
  const { data: filterImage, mutate: mutateFilterImage } = useSWR<CImageData[]>(
    `/image/${roomId}/filter`,
    {
      fallbackData: [],
    },
  );

  const {
    data: defaultImageList,
    trigger: defaultImgListTrigger,
    isMutating: defaultImgListLoading,
  } = useSWRMutation(`/room/${roomId}/imagelist`, getDefaultImgFetcher);

  const {
    data: filterImageList,
    trigger: filterImgListTrigger,
    isMutating: filterImgListLoading,
  } = useSWRMutation(`/room/${roomId}/imagelist/bydate`, getFilterImgFetcher);

  const { trigger: imgDataListTrigger, isMutating: imgDataLoading } =
    useSWRMutation('/room/imageData', getImageData);

  const [readStartNumber, setReadStartNumber] = useState(0);
  const [filterBoxState, setFilterBoxState] = useState(false);
  const [filterName, setFilterName] = useState('기본 게시물');
  const [filterSelectTerm, setFilterSelectTerm] = useState<SelectTerm>();

  const filterStartDateInputRef = useRef<HTMLInputElement>(null);
  const filterEndDateInputRef = useRef<HTMLInputElement>(null);
  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (
        !filterSelectTerm &&
        !defaultImgListLoading &&
        !imgDataLoading &&
        defaultImageList?.loadDataLength === 12
      ) {
        defaultImgListTrigger({
          start: readStartNumber,
        });
      }

      if (
        filterSelectTerm &&
        !filterImgListLoading &&
        !imgDataLoading &&
        filterImageList?.loadDataLength === 12
      ) {
        filterImgListTrigger({
          start: readStartNumber,
          start_date: filterSelectTerm.startDate,
          end_date: filterSelectTerm.endDate,
        });
      }
    },
    {
      threshold: 0.5,
    },
  );

  if (!postedImage || !filterImage) {
    return <div>로딩중...</div>;
  }

  useEffect(() => {
    if (!filterSelectTerm) {
      defaultImgListTrigger({
        start: readStartNumber,
      });
    } else {
      filterImgListTrigger({
        start: readStartNumber,
        start_date: filterSelectTerm?.startDate,
        end_date: filterSelectTerm?.endDate,
      });
    }

    return () => {
      mutatePostedImage([], false);
      mutateFilterImage([], false);
    };
  }, [roomId, filterSelectTerm]);

  useEffect(() => {
    if (!defaultImageList?.imagelist) return;

    setReadStartNumber((prev) => prev + 12);

    mutatePostedImage(
      async () => await imgDataListTrigger(defaultImageList.imagelist),
      {
        populateCache: (newData, currentData) => {
          if (currentData) {
            return [...currentData, ...newData];
          } else {
            return [...newData];
          }
        },
        revalidate: false,
      },
    );
  }, [defaultImageList]);

  useEffect(() => {
    if (!filterImageList?.imagelist) return;

    setReadStartNumber((prev) => prev + 12);

    mutateFilterImage(
      async () => await imgDataListTrigger(filterImageList.imagelist),
      {
        populateCache: (newData, currentData) => {
          if (currentData) {
            return [...currentData, ...newData];
          } else {
            return [...newData];
          }
        },
        revalidate: false,
      },
    );
  }, [filterImageList]);

  useEffect(() => {
    if (!realTimeImageList) return;

    mutatePostedImage(async () => await imgDataListTrigger(realTimeImageList), {
      populateCache: (newData, currentData) => {
        if (currentData) {
          return [...newData, ...currentData];
        } else {
          return [...newData];
        }
      },
      revalidate: false,
    });
  }, [realTimeImageList]);

  const getDateString = (dateValue: Date) => {
    const selectDate = `${dateValue.getFullYear()}-${
      dateValue.getMonth() + 1 >= 13 ? 0 : dateValue.getMonth() + 1
    }-${dateValue.getDate()}`;

    return { selectDate };
  };

  const onClickFilteringItem = (filterName: string) => () => {
    if (filterName === 'today') {
      setFilterName('오늘 날짜');
      const { selectDate } = getDateString(new Date());

      setReadStartNumber(0);
      setFilterSelectTerm({
        startDate: selectDate,
        endDate: selectDate,
      });
    } else if (filterName === 'yesterday') {
      setFilterName('어제 날짜');
      const dateValue = new Date();
      dateValue.setDate(dateValue.getDate() - 1);
      const { selectDate } = getDateString(dateValue);

      setReadStartNumber(0);
      setFilterSelectTerm({
        startDate: selectDate,
        endDate: selectDate,
      });
    } else if (filterName === 'selectDay') {
      setFilterName('기간 선택');
      setReadStartNumber(0);
    } else {
      setFilterName('기본 게시물');
      setReadStartNumber(0);
      setFilterSelectTerm(undefined);
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

    setReadStartNumber(0);
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
              <FilteringOption
                onClick={() => setFilterBoxState((prev) => !prev)}
              >
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
                    <div
                      className="option"
                      onClick={onClickFilteringItem('today')}
                    >
                      <span>오늘 날짜</span>
                    </div>
                    <div
                      className="option"
                      onClick={onClickFilteringItem('yesterday')}
                    >
                      <span>어제 날짜</span>
                    </div>
                    <div
                      className="option"
                      onClick={onClickFilteringItem('selectDay')}
                    >
                      <span>기간 선택</span>
                    </div>
                    <div
                      className="option"
                      onClick={onClickFilteringItem('default')}
                    >
                      <span>기본 게시물</span>
                    </div>
                  </div>
                )}
              </FilteringOption>
              {filterName === '기간 선택' && (
                <div className="select_date">
                  <label htmlFor="start_date">시작날</label>
                  <input
                    type="date"
                    id="start_date"
                    ref={filterStartDateInputRef}
                  />
                  <label htmlFor="end_date">마지막날</label>
                  <input
                    type="date"
                    id="end_date"
                    ref={filterEndDateInputRef}
                  />
                  <Button type="button" onClick={onClickCertainPeriodFilterBtn}>
                    확인
                  </Button>
                </div>
              )}
              <div className="tag">
                <span>
                  {filterSelectTerm ? '필터링된 이미지' : '게시된 이미지'}
                </span>
              </div>
              <ImageContentList
                ImageData={filterSelectTerm ? filterImage : postedImage}
                observerRef={observerRef}
              />
              {(defaultImgListLoading ||
                filterImgListLoading ||
                imgDataLoading) && <Spinner />}
            </div>
          </ContentBox>
        </MainContainer>
      </section>
    </Scrollbars>
  );
};

export default ContentSection;
