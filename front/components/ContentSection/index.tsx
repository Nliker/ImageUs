import React, {
  ChangeEvent,
  CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  getDefaultImgFetcher,
  getFilterImgFetcher,
  getImageData,
  getMarkerFetcher,
  getUnreadImageList,
} from '@utils/roomDataFetcher';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  ContentBox,
  ActiveContentBox,
  FilteringOption,
  ImageCard,
  ImageInfo,
  InfoItem,
  MainContainer,
  Wrapper,
} from './styles';
import { imageLoadNumber } from '@hooks/swrStore';
import { AxiosError, AxiosResponse } from 'axios';
import useIntersect from '@hooks/useIntersect';
import Scrollbars from 'react-custom-scrollbars';
import ImageContentList from '@components/ImageContentList';
import { SyncLoader } from 'react-spinners';
import { CImageData } from '@typing/client';
import { DImageData } from '@typing/db';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import { Button } from '@styles/Button';
import Spinner from '@styles/Spinner';
import { TbDoorExit } from 'react-icons/tb';
import { IconContext } from 'react-icons/lib';
import { SidebarContext } from '@layouts/AppLayout';

interface Props {
  roomId?: string;
}

interface SelectTerm {
  startDate?: string;
  endDate?: string;
}

const spinnerCSS: CSSProperties = {
  display: 'block',
  margin: '1rem auto',
  textAlign: 'center',
};

const ContentSection = ({ roomId }: { roomId?: string }) => {
  const [readStartNumber, setReadStartNumber] = useState(0);

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

  const { data: realTimeImageList, isLoading: realTimeImgLoading } = useSWR(
    `/room/${roomId}/unread-imagelist`,
    getUnreadImageList,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      refreshInterval: 10000,
    },
  );

  const { trigger: imgDataListTrigger, isMutating: imgDataLoading } =
    useSWRMutation('/room/imageData', getImageData);

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
        console.log('일반 이미지 인터섹션 데이터 패칭 요청');
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
        console.log('필터 이미지 인터섹션 데이터 패칭 요청');
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

  /*

   방에 처음 들어가서 마운트 됐을 때
   구분없이 전체 이미지를 보여준다.

  */

  useEffect(() => {
    console.log('컨텐트 섹션 룸아이디', roomId, filterSelectTerm);

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

  // 실시간 데이터 업데이트
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
    console.log(
      filterStartDateInputRef.current?.value,
      filterEndDateInputRef.current?.value,
    );
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

  console.log(filterSelectTerm?.startDate);

  return (
    <Scrollbars>
      <Wrapper>
        <MainContainer>
          <ActiveContentBox>
            <FilteringOption onClick={() => setFilterBoxState((prev) => !prev)}>
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
                <input type="date" id="end_date" ref={filterEndDateInputRef} />
                <Button type="button" onClick={onClickCertainPeriodFilterBtn}>
                  확인
                </Button>
              </div>
            )}
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
              <div>
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
            <div>
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
      </Wrapper>
    </Scrollbars>
  );
};

export default ContentSection;
