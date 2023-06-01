import React, { useState } from 'react';

import useInput from '@hooks/useInput';
import { Button } from '@styles/Button';
import useUserData from '@hooks/useUserData';
import { DUserInfo } from '@typing/db';
import { getErrorMessage } from '@utils/getErrorMessage';
import { InfoSection, InfoTable } from './styles';

const MyProfile = ({ userInfo }: { userInfo: DUserInfo | null }) => {
  const { requestChangeName } = useUserData();
  const [nameInput, setNameInput, handleNameInput] = useInput('');

  const [nameBoxState, setNameBoxState] = useState(false);

  const onClickChangeName = async () => {
    try {
      await requestChangeName(nameInput);
      setNameInput('');
      setNameBoxState(false);
      alert('이름을 변경하였습니다!');
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
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
              <strong>{userInfo?.email}</strong>
            </td>
          </tr>
          <tr>
            <th>가입 유형</th>
            <td>
              <div>{userInfo?.user_type}</div>
            </td>
          </tr>
          <tr>
            <th>이름</th>
            {!nameBoxState ? (
              <>
                <td>
                  <div>{userInfo?.name}</div>
                </td>
                <td>
                  <div className="btn_group">
                    <Button type="button" onClick={() => setNameBoxState(true)}>
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
                    <Button type="button" onClick={onClickChangeName}>
                      완료
                    </Button>
                    <Button
                      type="button"
                      className="cancel_btn"
                      onClick={() => setNameBoxState(false)}
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
          </tr>
        </tbody>
      </InfoTable>
    </InfoSection>
  );
};

export default MyProfile;
