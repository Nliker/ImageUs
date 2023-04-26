import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import useInput from '@hooks/useInput';
import { Button } from '@styles/Button';
import { InfoSection, InfoTable } from './styles';
import { logInCheckFetcher } from '@utils/logInFetcher';
import { changeUserInfoFetcher } from '@utils/userDataFetcher';

const MyProfile = () => {
  const { data: userInfo, mutate: updateUserInfo } = useSWR('/user/my');
  const { trigger: postUserInfoTrigger } = useSWRMutation(
    '/user/my',
    changeUserInfoFetcher,
  );

  const [profileState, setProfileState] = useState({
    intro: false,
    name: false,
  });
  const [nameInput, setNameInput, handleNameInput] = useInput('');

  const changeNameBox = useCallback(() => {
    setProfileState((prev) => {
      return {
        ...prev,
        name: true,
      };
    });
  }, [profileState]);

  const onClickPostIntro = (postTitle: string) => () => {
    if (postTitle === 'name') {
      postUserInfoTrigger({ [postTitle]: nameInput }).then(() => {
        setProfileState((prev) => ({ ...prev, name: false }));
        updateUserInfo(logInCheckFetcher('/user/my'));
      });
    } else {
      alert('잘못된 요청입니다.');
    }
  };

  return (
    <InfoSection>
      <InfoTable>
        <colgroup>
          <col width={'20%'} />
          <col width={'50%'} />
          <col width={'30%'} />
        </colgroup>
        <tbody>
          <tr>
            <th>이메일</th>
            <td colSpan={2}>
              <strong>{userInfo?.userInfo?.email}</strong>
            </td>
          </tr>
          <tr>
            <th>가입 유형</th>
            <td>
              <div>{userInfo?.userInfo?.user_type}</div>
            </td>
          </tr>
          <tr>
            <th>이름</th>
            {!profileState.name ? (
              <>
                <td>
                  <div>{userInfo?.userInfo?.name}</div>
                </td>
                <td>
                  <div className="btn_group">
                    <Button type="button" onClick={changeNameBox}>
                      이름 변경
                    </Button>
                  </div>
                </td>
              </>
            ) : (
              <>
                <td className="change_name">
                  <p>새로운 이름 입력</p>
                  <input
                    type="text"
                    id="name_label"
                    onChange={handleNameInput}
                    value={nameInput}
                    placeholder="이름 입력"
                  />
                </td>
                <td>
                  <div className="btn_group">
                    <Button type="button" onClick={onClickPostIntro('name')}>
                      완료
                    </Button>
                    <Button
                      type="button"
                      className="cancel_btn"
                      onClick={() =>
                        setProfileState((prev) => {
                          return {
                            ...prev,
                            name: false,
                          };
                        })
                      }
                    >
                      취소
                    </Button>
                  </div>
                </td>
              </>
            )}
          </tr>
          <tr>
            <th>비밀번호</th>
            <td>
              <strong>********</strong>
            </td>
            {/* <td className="btn_group">
              <Button type="button">비밀번호 변경</Button>
            </td> */}
          </tr>
        </tbody>
      </InfoTable>
    </InfoSection>
  );
};

export default MyProfile;
