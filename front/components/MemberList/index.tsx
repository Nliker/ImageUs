import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { IoMdArrowDropright } from 'react-icons/io';
import { Collapse, CreateBtnBox, Subtitle } from './styles';
import {
  deleteMemberFetcher,
  getUserListFetcher,
} from '@utils/roomDataFetcher';
import { DFriendData, DRoomData } from '@typing/db';
import CollapseListBox from '@components/CollapseListBox';
import ActionButton from '@styles/ActiveButton';
import { useParams } from 'react-router';

interface Props {
  currentRoomInfo: DRoomData;
}

const MemberList = memo(({ currentRoomInfo }: Props) => {
  const { roomId } = useParams<{ roomId: string }>();
  const { mutate } = useSWRConfig();
  // console.log(currentRoomInfo);

  const { data: showModalState, mutate: showModalMutate } =
    useSWR('showModalState');
  const { data: logInInfo } = useSWR('/user/my');
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
    if (!currentRoomInfo) return;
    const { userlist } = currentRoomInfo;

    const data = userlist.map((userData) => ({
      id: userData.id,
      data: userData.name,
    }));
    return [...data];
  }, [currentRoomInfo]);

  const onClickInviteMember = useCallback(() => {
    showModalMutate({
      ...showModalState,
      invite_member: true,
    });
  }, [showModalState]);

  const onClickDeleteMember = (memberId: number) => () => {
    deleteMemberTrigger(memberId).then(() => {
      const userId = sessionStorage.getItem('USER_ID');
      mutate(`/user/${userId}/roomlist`);
    });
  };

  return (
    <div>
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
            currentDataId={logInInfo.user_info.id}
            nameKey={'member'}
            onClickDeleteMember={onClickDeleteMember}
            readOnly
          />
          <CreateBtnBox>
            <ActionButton onClickBtn={onClickInviteMember} btnTitle={'+'} />
          </CreateBtnBox>
        </>
      )}
    </div>
  );
});

export default MemberList;
