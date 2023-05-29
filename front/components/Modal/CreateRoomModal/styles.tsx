import styled from '@emotion/styled';

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  box-sizing: border-box;

  overflow: auto;
`;

export const RoomNameInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 60px;
  gap: 1rem;
  margin: auto;

  text-align: center;
  box-shadow: 0px 1px 2px -1px rgb(0 0 0 / 40%);
`;

export const MemeberList = styled.div`
  flex: 1 0 auto;

  .member_list {
    display: flex;
    flex-direction: column;

    margin: auto;
    padding: 1.5rem;

    overflow-y: auto;

    & .friend_info_row {
      display: flex;
      justify-content: center;
      align-items: center;

      gap: 3rem;
      cursor: pointer;

      &:hover {
        background-color: whitesmoke;
      }
    }
  }
`;

export const CreateRoomInfo = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;

  .room_name {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 3rem;
  }

  .room_members {
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: center;

    ul {
      width: fit-content;
      margin: auto;
      padding: 0;

      li {
        list-style: circle;
      }
    }

    .no_friends {
      text-align: center;
    }
  }
`;

export const ActionBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;
  padding: 0 20px;

  box-shadow: 0px -1px 2px -1px rgb(0 0 0 / 40%);
`;
