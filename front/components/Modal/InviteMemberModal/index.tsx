import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useParams } from 'react-router';

import Scrollbars from 'react-custom-scrollbars';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';

import { getUserFriendList } from '@utils/userDataFetcher';
import { DFriendData } from '@typing/db';
import {
  getUserListFetcher,
  inviteFriendFetcher,
} from '@utils/roomDataFetcher';
import { Button } from '@styles/Button';
import { Container, Content, Title, Wrapper } from './styles';

type AppendCheckFriendData = DFriendData & { check: boolean };

const InviteMemberModal = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { mutate } = useSWRConfig();

  const { data: userFriendList } = useSWR('friendlist', getUserFriendList, {
    revalidateOnFocus: false,
  });
  const { data: roomMemberList } = useSWR(
    `/room/${roomId}/userlist`,
    getUserListFetcher,
    {
      revalidateOnFocus: false,
    },
  );
  const { trigger: inviteFriendsTrigger } = useSWRMutation(
    `/room/${roomId}/user`,
    inviteFriendFetcher,
  );

  const [checkFriendState, setCheckFriendState] = useState<
    AppendCheckFriendData[]
  >([]);

  useEffect(() => {
    if (!userFriendList || !roomMemberList) return;

    const newList = userFriendList.filter((userInfo: DFriendData) => {
      for (const roomUserInfo of roomMemberList) {
        if (roomUserInfo.id === userInfo.id) return false;
      }
      return true;
    });

    const appendCheckList = newList.map((data: DFriendData) => {
      return { ...data, check: false };
    });

    setCheckFriendState([...appendCheckList]);
  }, [userFriendList, roomMemberList]);

  const onClickFriendList = (dataId: number) => () => {
    const newData = checkFriendState.map((data) => {
      if (data.id === dataId) {
        return { ...data, check: !data.check };
      }
      return { ...data };
    });
    setCheckFriendState([...newData]);
  };

  const onClickInviteFriends = useCallback(() => {
    const selectDataId = checkFriendState
      .filter((data) => data.check)
      .map((data) => data.id);

    if (selectDataId.length === 0) {
      alert('선택된 친구가 없습니다.');
    } else {
      inviteFriendsTrigger(selectDataId).then(() => {
        const userId = sessionStorage.getItem('user_id');
        mutate(`/user/${userId}/roomlist`);
        mutate('modalState', { currentModalState: '' });
      });
    }
  }, [checkFriendState]);

  const checkFriendList = useMemo(
    () => checkFriendState.filter((data) => data.check),
    [checkFriendState],
  );

  return (
    <Wrapper>
      <Title>
        <h2>친구 초대하기</h2>
      </Title>
      <Container>
        <Scrollbars>
          <Content>
            <div className="content_box">
              <div className="content_list_box">
                <div className="content_subname">
                  <h3>초대할 친구 목록</h3>
                </div>
                <div className="content_list">
                  <Scrollbars>
                    <ul className="content_list_ul">
                      {checkFriendState.length !== 0 ? (
                        checkFriendState.map((data: AppendCheckFriendData) => (
                          <li
                            key={data.id}
                            onClick={onClickFriendList(data.id)}
                          >
                            <div className="list_layout">
                              <div className="list_check_icon">
                                {data.check ? (
                                  <AiFillCheckCircle />
                                ) : (
                                  <AiOutlineCheckCircle />
                                )}
                              </div>
                              <div className="list_info">
                                <p>이름: {data.name}</p>
                                <p>이메일: {data.email}</p>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>등록할 친구가 없습니다.</p>
                      )}
                    </ul>
                  </Scrollbars>
                </div>
              </div>
              <div className="selected_list_box">
                <div className="content_subname">
                  <h3>선택한 친구들</h3>
                </div>
                <div className="selected_list">
                  <Scrollbars>
                    {checkFriendList.length !== 0 ? (
                      <ul className="selected_list_ul">
                        {checkFriendList.map((data) => (
                          <li key={data.id}>{data.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>선택한 친구가 없습니다.</p>
                    )}
                  </Scrollbars>
                </div>
              </div>
              <div className="content_btn">
                <Button type="button" onClick={onClickInviteFriends}>
                  초대하기
                </Button>
              </div>
            </div>
          </Content>
        </Scrollbars>
      </Container>
    </Wrapper>
  );
};

export default InviteMemberModal;
