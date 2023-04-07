import React, { memo, useCallback, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useParams } from 'react-router';

import { IoMdArrowDropright } from 'react-icons/io';
import { deleteMemberFetcher } from '@utils/roomDataFetcher';
import { DRoomData } from '@typing/db';
import ActionButton from '@styles/ActiveButton';
import Spinner from '@styles/Spinner';

import CollapseListBox from '../CollapseListBox';
import { Collapse, CreateBtnBox, Subtitle, Wrapper } from './styles';

interface Props {
  currentRoomInfo: DRoomData;
}

const MemberList = memo(({ currentRoomInfo }: Props) => {
  const { roomId } = useParams<{ roomId: string }>();
  const { mutate } = useSWRConfig();

  const { data: userInfo } = useSWR('/user/my');
  const { trigger: deleteMemberTrigger } = useSWRMutation(
    `/room/${roomId}/user`,
    deleteMemberFetcher,
  );

  const [memberCollapse, setMemberCollapse] = useState<boolean>(true);

  const toggleMemberCollapse = useCallback(
    () => setMemberCollapse((prev) => !prev),
    [],
  );

  const collapseListBoxData = useCallback(() => {
    const { userlist } = currentRoomInfo;

    const data = userlist.map((userData) => ({
      id: userData.id,
      data: userData.name,
    }));
    return [...data];
  }, [currentRoomInfo]);

  const onClickDeleteMember = (memberId: number) => () => {
    deleteMemberTrigger(memberId).then(() => {
      const userId = sessionStorage.getItem('user_id');
      mutate(`/user/${userId}/roomlist`);
    });
  };

  if (!currentRoomInfo) return <Spinner />;

  return (
    <Wrapper>
      <Subtitle onClick={toggleMemberCollapse}>
        <Collapse collapse={memberCollapse}>
          <IoMdArrowDropright />
        </Collapse>
        <span>Members</span>
      </Subtitle>
      {memberCollapse && (
        <>
          <CollapseListBox
            data={collapseListBoxData()}
            currentLoginId={userInfo.userInfo.id}
            boxInfo={{
              boxName: 'member',
              hostId: currentRoomInfo.host_user_id,
            }}
            onClickDeleteMember={onClickDeleteMember}
            readOnly
          />
          <CreateBtnBox>
            <ActionButton
              onClickBtn={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();

                mutate('modalState', { currentModalState: 'inviteMember' });
              }}
              btnTitle={'+'}
            />
          </CreateBtnBox>
        </>
      )}
    </Wrapper>
  );
});

export default MemberList;
