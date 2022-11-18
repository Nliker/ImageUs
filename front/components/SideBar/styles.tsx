import styled from '@emotion/styled';

export const Wrapper = styled.div<{ show: boolean, isMobile: boolean }>`
  width: 215px;
  height: calc(100vh - 85px);
  box-sizing: border-box;
  position: fixed;
  z-index: 100;
  padding: 20px 0;
  background-color: grey;
  user-select: none;
  
  // transform: translate3d(-50%, 0, 0);
  transition: transform 0.5s;
  transform: translateX(-215px);

  ${({ show, isMobile }) =>
    (show || !isMobile) &&
    `
    // display: none;
    visibility: visible;
    transition: transform 0.5s;
    transform: translate3d(0, 0, 0);
    `}
`;

export const ContentWrapper = styled.div`
  padding-left: 10px;
`;

export const ChannelListBox = styled.div`
  margin-bottom: 10px;
`;
