import styled from '@emotion/styled';

export const ModalBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  z-index: 1002;
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 12px;

  background-color: cadetblue;
`;

export const Title = styled.div`
  text-align: center;
  font-size: 18px;
  padding: 5px 0;
  span {
    display: inline-block;
  }
`;

export const CloseBtn = styled.div`
  position: relative;
  display: inline-block;
  right: 5px;
  float: right;

  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
    vertical-align: top;
  }
`;

export const ContentBox = styled.div`
  width: 250px;
  padding: 20px;
`;

export const RoomName = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const MemeberList = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1.5rem 0;
  overflow-y: auto;
`;

export const ActionBtn = styled.div`
  display: inline-block;
  float: right;
`;

export const ResultRoomName = styled.div`
  flex: 1;
`;

export const ResultMembers = styled.div`
  flex: 5;
`;
