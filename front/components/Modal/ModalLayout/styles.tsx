import styled from '@emotion/styled';
import { ISize } from '.';

interface IContainerProps {
  size: ISize;
}

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

  background-color: rgb(0 0 0 / 40%);
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

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;
  box-sizing: border-box;

  color: white;
  background-color: #18456b;
  box-shadow: 0 2px 4px hsla(0, 0%, 81.2%, 0.5);
`;

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1001;

  width: ${({ size }) => size.width + 'px'};
  height: ${({ size }) => size.height + 'px'};
  min-width: 320px;

  outline: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  background-color: #fff;
  background-clip: padding-box;
`;

export const Content = styled.div`
  width: 100%;
  height: calc(100% - 40px);
`;
