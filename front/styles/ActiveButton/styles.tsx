import styled from '@emotion/styled';

export const CreateBtn = styled.button`
  position: relative;

  padding: 0;
  width: 80px;
  height: 50px;

  border: 4px solid #a6bedb;
  border-radius: 40px;
  outline: none;
  cursor: pointer;
  background-color: #86b1e5;
  transition: 0.13s ease-in-out;

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
    z-index: 1;

    width: 100%;
    height: 100%;

    border-radius: 40px;
    box-shadow: inset 0px -8px 0px #7395c0, 0px -8px 0px #9dbfe8;
    transition: 0.13s ease-in-out;
  }
  .btn_icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-self: start;
    justify-self: end;

    height: 32px;
    grid-column: 4;

    transition: 0.13s ease-in-out;
    transform: translate3d(0px, -4px, 0px);
  }
  .btn_text {
    position: relative;
    text-align: center;
    align-self: end;

    margin: 0;
    grid-column: 1/5;
    grid-row: 2;

    color: white;
    background-color: #888888;
    text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    transition: 0.13s ease-in-out;
    transform: translate3d(0px, -4px, 0px);
  }
`;
