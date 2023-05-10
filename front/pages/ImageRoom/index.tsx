import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

import { IconContext } from 'react-icons/lib';
import { SlCloudUpload } from 'react-icons/sl';
import { TbDoorExit } from 'react-icons/tb';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import Scrollbars from 'react-custom-scrollbars-2';

import { DRoomData } from '@typing/db';
import AppLayout from '@layouts/AppLayout';
import useModal from '@hooks/useModal';
import { Button } from '@styles/Button';
import { SelectTerm } from '@typing/client';
import SidebarContext from '@utils/SidebarContext';
import useRoomList from '@hooks/useRoomList';
import { getErrorMessage } from '@utils/getErrorMessage';

import ImageSection from './Components/ImageSection';
import {
  LeftHeaderIcon,
  ContentBox,
  FilteringOption,
  MainContainer,
  UploadButton,
} from './styles';

export const DeviceCheckContext = createContext<boolean | null>(null);

const ImageRoom = () => {
  const userId = sessionStorage.getItem('user_id');
  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId || !userId) return null;

  const navigate = useNavigate();
  const { showUploadImgModal } = useModal();
  const { showAlertModal } = useModal();
  const { roomList, leaveRoom } = useRoomList(userId);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [filterTagName, setFilterTagName] = useState('전체 게시물');
  const [filterStateNum, setFilterStateNum] = useState(0);
  const [filterBoxState, setFilterBoxState] = useState(false);
  const [showSelectDateForm, setShowSelectDateForm] = useState(false);
  const [filterSelectTerm, setFilterSelectTerm] = useState<SelectTerm>({
    startDate: '',
    endDate: '',
  });

  const filterStartDateInputRef = useRef<HTMLInputElement>(null);
  const filterEndDateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isMobileValue = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobileValue) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

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

  const onClickLeaveRoom = () => {
    const executeWork = async () => {
      try {
        await leaveRoom(roomId);
        navigate('/select-room', { replace: true });
      } catch (error) {
        const message = getErrorMessage(error);
        alert(message);
      }
    };

    showAlertModal({ text: '방에서 나가시겠습니까?', executeWork });
  };

  const loadImgTypeInfo = useMemo(
    () => ({
      isfiltered: filterStateNum !== 0 ? true : false,
      filterState: filterStateNum,
      filterStartDate: filterSelectTerm.startDate,
      filterEndDate: filterSelectTerm.endDate,
    }),
    [filterSelectTerm, filterStateNum],
  );

  const checkValideRoomId = () => {
    if (!roomList) return false;

    const isValidRoomId = roomList.some((roomInfo: DRoomData) => {
      return '' + roomInfo.id === roomId;
    });

    return isValidRoomId;
  };

  const onClickUploadModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    showUploadImgModal('room');
  };

  if (!checkValideRoomId()) {
    alert('잘못된 접근입니다.');
    return <Navigate to="/select-room" />;
  }

  return (
    <AppLayout isImageRoom>
      <DeviceCheckContext.Provider value={isMobile}>
        {}
        <Scrollbars>
          <MainContainer>
            <LeftHeaderIcon>
              <div className="active_icon_box">
                <SidebarContext.Consumer>
                  {({ setSidebarState }) => (
                    <div
                      className="sidebar_icon"
                      onClick={() => setSidebarState((prev) => !prev)}
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
            </LeftHeaderIcon>

            <ContentBox>
              <div className="content_box_pos">
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
                      {filterStateNum === 3
                        ? `${filterSelectTerm.startDate} ~ ${filterSelectTerm.endDate}`
                        : filterTagName}
                    </span>
                  </div>
                </div>
                <ImageSection loadImgTypeInfo={loadImgTypeInfo} />
              </div>
            </ContentBox>
          </MainContainer>
        </Scrollbars>
      </DeviceCheckContext.Provider>
      <UploadButton onClick={onClickUploadModal}>
        <IconContext.Provider
          value={{
            size: '100%',
            style: { display: 'inline-block' },
          }}
        >
          <SlCloudUpload />
        </IconContext.Provider>
        <span>업로드</span>
      </UploadButton>
    </AppLayout>
  );
};

export default ImageRoom;
