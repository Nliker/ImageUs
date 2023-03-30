import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  overflow: auto;
`;

export const Background = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  z-index: 1000;

  background-color: rgba(0, 0, 0, 0.65);
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;

  width: 60%;
  height: 80%;
  min-width: 320px;
  max-width: 520px;
`;

export const CloseBtn = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 30px;
  z-index: 1003;

  padding: 8px;

  & > div {
    display: flex;
  }
  svg {
    width: 25px;
    height: 25px;

    color: white;
    cursor: pointer;
  }
`;
