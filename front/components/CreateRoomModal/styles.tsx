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
  width: 300px;
  height: 300px;
  padding: 20px;
  background-color: wheat;
  border-radius: 12px;
`;

export const RoomName = styled.div`
  flex: 3;
  label {
    vertical-align: middle;
    margin-right: 10px;
  }
`;

export const MemeberList = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
`;

export const NextBtn = styled.div`
  flex: 1;
  text-align: end;
`;

export const ResultRoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ResultRoomName = styled.div`
  flex: 1;
`;

export const ResultMembers = styled.div`
  flex: 5;
`
