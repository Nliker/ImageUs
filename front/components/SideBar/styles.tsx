import styled from '@emotion/styled';

export const Background = styled.div`
  position: fixed;
  z-index: 100;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.65);
`;

export const Wrapper = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  box-sizing: border-box;

  width: 300px;
  height: 100%;
  z-index: 100;

  background-color: transparent;
  box-shadow: rgb(0 0 0 / 8%) 2px 0px 2px;
  user-select: none;

  transition: transform 0.5s;
  transform: translateX(-300px);

  ${({ show }) =>
    show &&
    `
    visibility: visible;
    transform: translate3d(0, 0, 0);
    `}
`;

export const ContentWrapper = styled.div`
  height: 100%;
  & > div {
    border-bottom: 1px solid rgb(237, 241, 245);
    padding: 9px 8px 8px 6px;
  }
`;

export const ContentTabs = styled.ul`
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100%;
  overflow: hidden;
`;

export const Tab = styled.li`
  float: left;

  width: calc(100% / 2);
  height: 40px;

  & .tab_label {
    position: relative;
    display: inline-block;

    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 8px 20px;

    border: 1px solid #ccc;
    background: #eee;
    cursor: pointer;
  }

  & [name='tab-group-1'] {
    display: none;
  }

  & .tab_content {
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;

    box-sizing: border-box;
    background: white;
    overflow-y: auto;
  }

  & .tab_content > .tab_content_box {
    height: 100%;
    box-sizing: border-box;
    padding: 10px;

    transform: translateX(-100%);
  }

  & [type='radio']:checked ~ label {
    background: white;
    border-bottom: 1px solid white;
    z-index: 2;
  }

  & [type='radio']:checked + label + .tab_content {
    z-index: 10;
  }

  & [type='radio']:checked + label + .tab_content > .tab_content_box {
    display: block;
    transform: translateX(0);
  }
`;
