import styled from '@emotion/styled';

export const ModalBoxContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  border-radius: 12px;

  box-sizing: border-box;
  background-color: white;
`;

export const Title = styled.div`
  flex: 1;

  height: 30%;
  font-size: 18px;

  box-shadow: 0 2px 4px hsla(0, 0%, 81.2%, 0.5);
  text-align: center;

  span {
    display: inline-block;
  }
`;

export const CloseBtn = styled.div`
  float: right;
  display: inline-block;
  position: relative;
  right: 5px;

  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
    vertical-align: top;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;

  height: 70%;
  width: 100%;

  box-sizing: border-box;

  .result_content {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: calc(100% - 60px);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  height: calc(100% - 60px);
  padding: 1rem 0;

  overflow: auto;
`;

export const RoomNameInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;
  gap: 1rem;
  margin: auto;

  text-align: center;
`;

export const MemeberList = styled.div`
  flex: 6;

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

export const ActionBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;
  padding: 0 20px;

  box-shadow: 0px -1px 2px -1px rgb(0 0 0 / 40%);
`;

export const ResultRoomName = styled.div`
  flex: 2;
  display: flex;
  align-items: center;

  max-width: 80%;
  gap: 3rem;
`;

export const ResultMembers = styled.div`
  flex: 6;
  max-width: 80%;

  ul li {
    list-style: circle;
  }
`;

export const ResultActionBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 60px;
  padding: 0 20px;

  box-sizing: border-box;
`;
