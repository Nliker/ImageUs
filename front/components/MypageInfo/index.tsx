import React from 'react';

const MypageInfo = () => {
  return (
    <div>
      <div>
        <aside>
          <label htmlFor="">사용자 이름</label>
        </aside>
        <div>
          <input type="text" placeholder="사용자 이름" />
        </div>
      </div>
      <div>
        <aside>
          <label htmlFor="">이메일 주소</label>
        </aside>
        <div>
          <input type="text" placeholder="이메일 주소" />
        </div>
      </div>
      <div>
        <aside>
          <label htmlFor="">비밀번호 변경</label>
        </aside>
        <div>
          <button type="button">변경하기</button>
        </div>
      </div>
      {/* <div>
        <aside>
          <label htmlFor="">방 목록</label>
        </aside>
        <div></div>
      </div> */}
    </div>
  );
};

export default MypageInfo;