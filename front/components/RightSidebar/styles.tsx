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

export const Wrapper = styled.div<{ show: boolean; isMobile: boolean }>`
  position: absolute;
  top: 0;

  ${({ isMobile }) =>
    isMobile ? `width: calc(100% - 40px);` : `width: 300px;`}
  height: 100%;
  z-index: 100;
  box-sizing: border-box;

  background-color: transparent;
  box-shadow: rgb(0 0 0 / 8%) 2px 0px 2px;
  user-select: none;

  transition: left 0.5s;
  left: 100%;

  ${({ show, isMobile }) =>
    show
      ? isMobile
        ? `visibility: visible;
    left: calc(40px);`
        : `visibility: visible;
    left: calc(100% - 300px);`
      : ''}
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
  height: 100%;

  list-style: none;
  /* overflow: hidden; */
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
    z-index: 1;

    padding: 0;

    border-left: 1px solid #ccc;
    box-sizing: border-box;
    background: white;
    overflow-y: auto;

    .leave_btn {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      display: inline-block;
      margin: 0 auto;
      padding: 0;

      border-radius: 0.25rem;
      text-decoration: none;
      text-align: center;
      white-space: nowrap;
      cursor: pointer;

      .button_wrap {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;

        height: 2rem;
        gap: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;

        border-radius: 0.25rem;
        background-color: #eee;
        color: black;

        &:hover {
          color: white;
          background-color: #dc3545;
        }
      }
    }
  }

  & .tab_content > .tab_content_box {
    box-sizing: border-box;
    height: 100%;
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

export const CloseIcon = styled.div`
  position: absolute;
  left: -37px;
  top: 10%;

  width: 30px;
  height: 80px;
  padding: 4px;

  background-color: #99aebb;
  border-radius: 20px 0 0 20px;
  cursor: pointer;
`;
