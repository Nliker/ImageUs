import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 1002;
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Background = styled.div`
  position: fixed;
  z-index: 1000;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.65);
`;

export const CloseBtn = styled.div`
  position: absolute;
  display: flex;
  z-index: 1003;
  top: 10px;
  right: 10px;
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
