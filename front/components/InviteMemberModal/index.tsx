import React, { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { AiOutlineClose } from 'react-icons/ai';
import { CloseBtn, Container, Content, ListBox, Title, Wrapper } from './styles';
import { getUserFriendList } from '@utils/userDataFetcher';
import { DFriendData } from '@typing/db';
import useSWRMutation from 'swr/mutation';
import { inviteFriendFetcher } from '@utils/roomDataFetcher';

const InviteMemberModal = () => {
  const { data: roomId } = useSWR('roomId');
  const { data: modalState, mutate: modalMutate } = useSWR('showModalState');
  const { data: friendList } = useSWR('friendlist', getUserFriendList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { trigger, isMutating } = useSWRMutation('inviteFriend', inviteFriendFetcher);
  const { mutate } = useSWRConfig();

  const onClickCloseBtn = useCallback(() => {
    modalMutate(
      {
        ...modalState,
        invite_member: false,
      },
      false,
    );
  }, []);

  const onClickInviteBtn = useCallback(
    (friendId: string) => async () => {
      await trigger({ invite_userlist: [friendId], roomId });
      await mutate(['userlist', roomId]);
    },
    [],
  );

  return (
    <Wrapper>
      <Container>
        <Title>
          <span>친구 초대하기</span>
          <CloseBtn onClick={onClickCloseBtn}>
            <AiOutlineClose />
          </CloseBtn>
        </Title>
        <Content>
          <ListBox>
            <ul>
              {friendList &&
                friendList.map((data: DFriendData) => (
                  <li key={data.id}>
                    <div>
                      <p>{data.name}</p>
                      <p>{data.email}</p>
                      <button type="button" onClick={onClickInviteBtn(data.id)}>
                        초대하기
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </ListBox>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default InviteMemberModal;
