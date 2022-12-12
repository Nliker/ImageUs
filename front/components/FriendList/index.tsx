import React from "react";
import { Wrapper } from "./styles";

const dummyFreindList = [
    {
      id: 1,
      name: '친구1',
      email: 'email1',
      type: 'freind',
    },
    {
      id: 2,
      name: '친구2',
      email: 'email2',
      type: 'freind',
    },
    {
      id: 3,
      name: '친구3',
      email: 'email3',
      type: 'freind',
    },
    {
      id: 4,
      name: '가족1',
      email: 'email4',
      type: 'family',
    },
    {
      id: 5,
      name: '가족2',
      email: 'email5',
      type: 'family',
    },
  ];

const FriendList = () => {
    return (
        <Wrapper>
            <div>
              <table>
                <colgroup></colgroup>
                <thead>
                  <tr>
                    <th scope="col">이름</th>
                    <th scope="col">이메일</th>
                    <th scope="col">관계</th>
                    <th scope="col">조회</th>
                    <th scope="col">목록에서 삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyFreindList.map((data) => (
                    <tr key={data.id}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.type}</td>
                      <td>
                        <div>
                          <button type="button">함께 있는 방 조회</button>
                        </div>
                      </td>
                      <td>
                        <div>
                          <button type="button">삭제</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Wrapper>
    );
};

export default FriendList;