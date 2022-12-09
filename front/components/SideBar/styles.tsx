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
    show &&
    `
    visibility: visible;
    transition: transform 0.5s;
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
  // padding: 10px 0;
  & label {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 8px 20px;
    border: 1px solid #ccc;
    background: #eee;
  }
  & [type='radio'] {
    display: none;
  }
  & .tab_content {
    position: absolute;
    height: calc(100% - 40px);
    top: 39px;
    left: 0;
    right: 0;
    padding: 0;
    background: white;
    box-sizing: border-box;
    border: 1px solid #ccc;
    // border-top: none;
    overflow-y: auto;
  }
  & .tab_content > article {
    height: 400px;
    padding: 10px;

    transform: translateX(-100%);
    // transition: all 0.5s ease-in-out;
  }
  & [type='radio']:checked ~ label {
    background: white;
    border-bottom: 1px solid white;
    z-index: 2;
  }
  & [type='radio']:checked + label + .tab_content {
    z-index: 1;
  }
  & [type='radio']:checked + label + .tab_content > article {
    display: block;
    transform: translateX(0);
  }
`;

export const CreateRoomBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// export const ModalWrapper = styled.div`
//   position: fixed;
//   top: 0;
//   right: 0;
//   left: 0;
//   bottom: 0;
//   z-index: 1000;
// `;

export const CreateRoomBtn = styled.button`
  position: relative;

  padding: 0;
  width: 150px;
  height: 50px;

  border: 4px solid #888888;
  outline: none;
  background-color: #f4f5f6;
  border-radius: 40px;
  // box-shadow: -6px -20px 35px #ffffff, -6px -10px 15px #ffffff, -20px 0px 30px #ffffff, 6px 20px 25px rgba(0, 0, 0, 0.2);
  transition: 0.13s ease-in-out;
  cursor: pointer;

  &:active {
    box-shadow: none;
    .btn_content {
      box-shadow: none;
      .btn_icon,
      .btn_text {
        transform: translate3d(0px, 0px, 0px);
      }
    }
  }
  .btn_content {
    position: relative;
    // display: grid;

    // padding: 20px;
    width: 100%;
    height: 100%;

    // grid-template-columns: 1fr 1fr 1fr 1fr;
    // grid-template-rows: 1fr 1fr;

    box-shadow: inset 0px -8px 0px #dddddd, 0px -8px 0px #f4f5f6;
    border-radius: 40px;
    transition: 0.13s ease-in-out;

    z-index: 1;
  }
  .btn_icon {
    position: relative;
    display: flex;
    justify-content: center;

    transform: translate3d(0px, -4px, 0px);
    grid-column: 4;
    align-self: start;
    justify-self: end;
    // width: 32px;
    height: 32px;
    transition: 0.13s ease-in-out;
  }
  .btn_text {
    position: relative;

    transform: translate3d(0px, -4px, 0px);
    margin: 0;
    align-self: end;
    grid-column: 1/5;
    grid-row: 2;

    text-align: center;
    // font-size: 32px;
    background-color: #888888;
    color: transparent;
    text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    transition: 0.13s ease-in-out;
  }
`;
