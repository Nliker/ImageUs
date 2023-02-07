import React, { useCallback, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { Container, Content, Title, Wrapper } from './styles';
import { getUserFriendList } from '@utils/userDataFetcher';
import { DFriendData } from '@typing/db';
import useSWRMutation from 'swr/mutation';
import {
  getUserListFetcher,
  inviteFriendFetcher,
} from '@utils/roomDataFetcher';
import { useParams } from 'react-router';
import { AxiosError } from 'axios';
import { Button } from '@styles/Button';

type AppendCheckFriendData = DFriendData & { check: boolean };

const InviteMemberModal = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { data: showModalState, mutate: modalMutate } =
    useSWR('showModalState');

  const { data: userFriendList } = useSWR('friendlist', getUserFriendList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data: roomFreindList, mutate: userlistMutate } = useSWR(
    ['userlist', roomId],
    getUserListFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const { trigger: inviteFriendsTrigger } = useSWRMutation(
    `/room/${roomId}/user`,
    inviteFriendFetcher,
  );
  const { mutate } = useSWRConfig();

  const [notInvitedFriends, setNotInvitedFriends] = useState<
    AppendCheckFriendData[]
  >([]);

  useEffect(() => {
    if (!userFriendList || !roomFreindList) return;

    const newList = userFriendList.filter((userInfo: DFriendData) => {
      for (const roomUserInfo of roomFreindList) {
        if (roomUserInfo.id === userInfo.id) return false;
      }
      return true;
    });

    const appendCheckList = newList.map((data: DFriendData) => {
      return { ...data, check: false };
    });

    setNotInvitedFriends([...appendCheckList]);
  }, [userFriendList, roomFreindList]);

  const getSelectFriends = useCallback(() => {
    const selectMemberName = notInvitedFriends
      .filter((data) => data.check)
      .map((data) => data.name);
    return selectMemberName.join(' ');
  }, [notInvitedFriends]);

  const onClickFriendList = (dataId: number) => () => {
    const newData = notInvitedFriends.map((data) => {
      if (data.id === dataId) {
        return { ...data, check: !data.check };
      }
      return { ...data };
    });
    setNotInvitedFriends([...newData]);
  };

  const onClickInviteFriends = useCallback(() => {
    const selectDataId = notInvitedFriends
      .filter((data) => data.check)
      .map((data) => data.id);

    if (selectDataId.length === 0) {
      alert('선택된 친구가 없습니다.');
    } else {
      inviteFriendsTrigger(selectDataId)
        .then(() => {
          modalMutate({ ...showModalState, invite_member: false });
          mutate(['userlist', roomId]);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            alert('오류가 발생했습니다..');
          }
        });
    }
  }, [notInvitedFriends]);

  return (
    <Wrapper>
      <Container>
        <Title>
          <h1>친구 초대하기</h1>
        </Title>
        <Content>
          <div className="content_box">
            <div className="content_subname">
              <h2>초대할 친구 목록</h2>
            </div>
            <ul className="not_selected_ul">
              {notInvitedFriends &&
                notInvitedFriends.map((data: AppendCheckFriendData) => (
                  <li key={data.id} onClick={onClickFriendList(data.id)}>
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
                ))}
            </ul>
            <div className="content_subname">
              <h2>선택한 친구들</h2>
            </div>
            <ul className="selected_member_ul">
              {notInvitedFriends &&
                notInvitedFriends
                  .filter((data) => data.check)
                  .map((data) => <li key={data.id}>{data.name}</li>)}
            </ul>
            <div className="content_btn">
              <Button type="button" onClick={onClickInviteFriends}>
                초대하기
              </Button>
            </div>
          </div>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default InviteMemberModal;
