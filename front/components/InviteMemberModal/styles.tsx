import styled from '@emotion/styled';

export const Wrapper = styled.div`
  // position: absolute;
  // display: flex;
  // justify-content: center;
  // align-items: center;

  // width: 100%;
  // height: 100%;
  // z-index: 1002;

  border-radius: 6px;
`;

export const Container = styled.div`
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

export const Content = styled.div`
  width: 300px;
  padding: 20px;
`;

export const ListBox = styled.div`
  height: 300px;
  overflow: auto;
`;
