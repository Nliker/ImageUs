import styled from '@emotion/styled';

export const Wrapper = styled.div<{ show: boolean }>`
  width: 215px;
  height: calc(100vh - 85px);
  box-sizing: border-box;
  position: fixed;
  z-index: 100;
  background-color: transparent;
  box-shadow: rgb(0 0 0 / 8%) 2px 0px 2px;
  user-select: none;

  transition: transform 0.5s;
  transform: translateX(-215px);

  ${({ show }) =>
    (show) &&
    `
    visibility: visible;
    transition: transform 0.5s;
    transform: translate3d(0, 0, 0);
    `}
`;

export const ContentWrapper = styled.div`
  & > div {
    border-bottom: 1px solid rgb(237, 241, 245);
    padding: 9px 8px 8px 6px;
  }
`;

export const ChannelListBox = styled.div`
  // margin-bottom: 10px;
`;
