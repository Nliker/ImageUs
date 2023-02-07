import React, { memo, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { IoMdArrowDropright } from 'react-icons/io';
import { Collapse, CreateBtnBox, Subtitle } from './styles';
import { getUserListFetcher } from '@utils/roomDataFetcher';
import { DFriendData } from '@typing/db';
import CollapseListBox from '@components/CollapseListBox';
import ActionButton from '@styles/ActiveButton';

const MemberList = memo(({ roomId }: { roomId?: string }) => {
  const { data: showModalState, mutate: showModalMutate } =
    useSWR('showModalState');

  const { data: logInInfo } = useSWR('/user/my');
  const { data: userlist, mutate: userlistMutate } = useSWR<DFriendData[]>(
    ['userlist', roomId],
    getUserListFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const [memberCollapse, setMemberCollapse] = useState<boolean>(true);

  useEffect(() => {
    if (!roomId) return;
    userlistMutate();
  }, [roomId]);

  const toggleMemberCollapse = useCallback(
    () => setMemberCollapse((prev) => !prev),
    [],
  );

  const collapseListBoxData = useCallback(() => {
    if (!userlist) return [];
    const data = userlist.map((userData) => ({
      id: userData.id,
      data: userData.name,
    }));
    return [...data];
  }, [userlist]);

  const onClickInviteMember = useCallback(() => {
    showModalMutate({
      ...showModalState,
      invite_member: true,
    });
  }, [showModalState]);

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
