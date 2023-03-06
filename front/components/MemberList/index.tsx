import React, { memo, useCallback, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useParams } from 'react-router';

import { IoMdArrowDropright } from 'react-icons/io';
import { deleteMemberFetcher } from '@utils/roomDataFetcher';
import { DRoomData } from '@typing/db';
import CollapseListBox from '@components/CollapseListBox';
import ActionButton from '@styles/ActiveButton';
import Spinner from '@styles/Spinner';
import { Collapse, CreateBtnBox, Subtitle } from './styles';

interface Props {
  currentRoomInfo: DRoomData;
}

const MemberList = memo(({ currentRoomInfo }: Props) => {
  const { roomId } = useParams<{ roomId: string }>();
  const { mutate } = useSWRConfig();

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
            currentLoginId={logInInfo.user_info.id}
            boxInfo={{
              boxName: 'member',
              hostId: currentRoomInfo.host_user_id,
            }}
            onClickDeleteMember={onClickDeleteMember}
            readOnly
          />
          <CreateBtnBox>
            <ActionButton
              onClickBtn={() => {
                mutate('modalState', { currentModalState: 'inviteMember' });
              }}
              btnTitle={'+'}
            />
          </CreateBtnBox>
        </>
      )}
    </div>
  );
});

export default MemberList;
