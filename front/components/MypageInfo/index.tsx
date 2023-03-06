import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import useInput from '@hooks/useInput';
import { logInCheckFetcher } from '@utils/logInFetcher';
import { postUserInfoFetcher } from '@utils/userDataFetcher';
import { Button } from '@styles/Button';
import { InfoSection, InfoTable } from './styles';

const MypageInfo = () => {
  const { data: userInfo } = useSWR('/user/my', logInCheckFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { trigger: postUserInfoTrigger } = useSWRMutation(
    '/user/my',
    postUserInfoFetcher,
  );

  const [profileState, setProfileState] = useState({
    intro: false,
    name: false,
  });
  const [introductionInput, setIntroductionInput, handleIntroInput] =
    useInput('');
  const [nameInput, setNameInput, handleNameInput] = useInput('');

  const changeIntroBox = useCallback(() => {
    setProfileState((prev) => {
      return {
        ...prev,
        intro: true,
      };
    });
  }, [profileState]);

  const changeNameBox = useCallback(() => {
    setProfileState((prev) => {
      return {
        ...prev,
        name: true,
      };
    });
  }, [profileState]);

  const onClickPostIntro = useCallback(
    (postTitle: string) => () => {
      if (postTitle === 'profile') {
        postUserInfoTrigger({ [postTitle]: introductionInput });
      } else if (postTitle === 'name') {
        postUserInfoTrigger({ [postTitle]: nameInput });
      } else {
        alert('잘못된 요청입니다.');
      }
    },
    [introductionInput, nameInput],
  );

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
              <strong>{userInfo?.user_info.email}</strong>
            </td>
          </tr>
          <tr>
            <th>가입 유형</th>
            <td>
              <div>{userInfo?.user_info.profile}</div>
            </td>
          </tr>
          <tr>
            <th>이름</th>
            {!profileState.name ? (
              <>
                <td>
                  <div>{userInfo?.user_info.name}</div>
                </td>
                <td className="btn_group">
                  <Button type="button" onClick={changeNameBox}>
                    이름 변경
                  </Button>
                </td>
              </>
            ) : (
              <>
                <td>
                  <div>
                    <label htmlFor="name_label">
                      이름 수정
                      <div>
                        <input
                          type="text"
                          id="name_label"
                          onChange={handleNameInput}
                          value={nameInput}
                          placeholder="이름 입력"
                        />
                      </div>
                    </label>
                  </div>
                </td>
                <td className="btn_group">
                  <Button type="button" onClick={onClickPostIntro('name')}>
                    완료
                  </Button>
                  <Button
                    type="button"
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
                </td>
              </>
            )}
          </tr>
          <tr>
            <th>비밀번호</th>
            <td>
              <strong>********</strong>
            </td>
            <td className="btn_group">
              <Button type="button">비밀번호 변경</Button>
            </td>
          </tr>
        </tbody>
      </InfoTable>
    </InfoSection>
  );
};

export default MypageInfo;
