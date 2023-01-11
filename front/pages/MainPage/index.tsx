import ContentImageModal from '@components/ContentImageModal';
import ContentSection from '@components/ContentSection';
import CreateRoomModal from '@components/CreateRoomModal';
import SideBar from '@components/SideBar';
import ToolBar from '@components/ToolBar';
import AppLayout from '@layouts/AppLayout';
import { IRoomData } from '@typing/db';
import { logInCheckFetcher } from '@utils/logInFetcher';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { ContentWrappper, MainIntroduction, MainRoomList, Wrappper } from './styles';

const MainPage = () => {
  const { data: isLogIn } = useSWR('/user/my');
  const { data: roomlist, trigger, isMutating } = useSWRMutation('roomlist', getUserRoomListFetcher);
  const navigate = useNavigate();
  // const { data: roomlist, isLoading } = useSWR('roomlist', getUserRoomListFetcher, {
  //   revalidateIfStale: false,
  //   revalidateOnFocus: false,
  //   revalidateOnReconnect: false,
  // });
  // const { data: room}

  // const { roomId } = useParams<{ roomId: string | undefined }>();
  // const [showSideBar, setshowSideBar] = useState<boolean>(false);
  // const handleRoomListBtn = useCallback(() => {
  //   setshowSideBar((prev) => !prev);
  // }, [showSideBar]);

  // const onClickRoomList = useCallback(() => {}, [roomlist]);

  useEffect(() => {
    if (!isLogIn) return;
    trigger();
  }, [isLogIn]);

  console.log('메인페이지', '로그인 유무:', isLogIn);

  return (
    <AppLayout>
      <ToolBar />
      {/* {roomId && <SideBar show={showSideBar} roomId={roomId} />} */}
      <Wrappper>
        <ContentWrappper>
          <main>
            {!isLogIn ? (
              <MainIntroduction>
                <header>
                  <h1>
                    지인들과의 사진을 <span className="brand_logo">ImageUS</span>와
                    <br /> 공유하고 간직하세요!
                  </h1>
                </header>
              </MainIntroduction>
            ) : (
              <section>
                <MainRoomList>
                  <strong>방에 입장하기</strong>
                  <ul>
                    {!isMutating &&
                      roomlist?.map((roomData: IRoomData) => (
                        <li key={roomData.id}>
                          <Link to={`/booth/${roomData.id}`}>{roomData.title}</Link>
                        </li>
                      ))}
                  </ul>
                </MainRoomList>
              </section>
            )}
          </main>
          {/* {roomId ? (
            <ContentSection roomId={roomId} />
          ) : (
          )} */}
        </ContentWrappper>
      </Wrappper>
    </AppLayout>
  );
};

export default MainPage;
