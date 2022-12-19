import useInput from '@hooks/useInput';
import React, { memo, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { InfoTable } from './styles';

function getUserInfo() {
  const email = sessionStorage.getItem('EMAIL');
  const name = sessionStorage.getItem('NAME');
  const profile = sessionStorage.getItem('PROFILE');

  return {
    userInfo: {
      email,
      name,
      profile,
    },
  };
}

const MypageInfo = memo(() => {
  const [profileState, setProfileState] = useState({
    intro: false,
    name: false,
  });
  const [introductionInput, setIntroductionInput, handleIntroInput] = useInput('');
  const [nameInput, setNameInput, handleNameInput] = useInput('');
  const { userInfo } = useMemo(getUserInfo, []);

  const onClickChangeIntroBtn = useCallback(() => {
    setProfileState((prev) => {
      return {
        ...prev,
        intro: true,
      };
    });
  }, [profileState]);

  const onClickChangeNameBtn = useCallback(() => {
    setProfileState((prev) => {
      return {
        ...prev,
        name: true,
      };
    });
  }, [profileState]);

  return (
    <section>
      <InfoTable>
        <colgroup>
          <col width={'30%'} />
          <col width={'40%'} />
          <col width={'30%'} />
        </colgroup>
        <tbody>
          <tr>
            <th>이메일</th>
            <td colSpan={2}>
              <strong>{userInfo.email}</strong>
            </td>
          </tr>
          <tr>
            <th>소개글</th>
            {!profileState.intro ? (
              <>
                <td>
                  <div>{userInfo.profile}</div>
                </td>
                <td>
                  <button type="button" onClick={onClickChangeIntroBtn}>
                    소개글 변경
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>
                  <div>
                    <label htmlFor="intro_label">
                      소개글 수정
                      <div>
                        <input
                          type="text"
                          id="intro_label"
                          onChange={handleIntroInput}
                          value={introductionInput}
                          placeholder="소개글 입력"
                        />
                      </div>
                    </label>
                  </div>
                </td>
                <td>
                  <button type="button">완료</button>
                  <button
                    type="button"
                    onClick={() =>
                      setProfileState((prev) => {
                        return {
                          ...prev,
                          intro: false,
                        };
                      })
                    }
                  >
                    취소
                  </button>
                </td>
              </>
            )}
          </tr>
          <tr>
            <th>이름</th>
            {!profileState.name ? (
              <>
                <td>
                  <div>{userInfo.name}</div>
                </td>
                <td>
                  <button type="button" onClick={onClickChangeNameBtn}>
                    이름 변경
                  </button>
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
                <td>
                  <button type="button">완료</button>
                  <button
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
                  </button>
                </td>
              </>
            )}
          </tr>
          <tr style={{ borderTop: '1px solid black' }}>
            <th>비밀번호</th>
            <td>
              <strong>********</strong>
            </td>
            <td>
              <button type="button">비밀번호 변경</button>
            </td>
          </tr>
        </tbody>
      </InfoTable>
    </section>
  );
});

export default MypageInfo;
