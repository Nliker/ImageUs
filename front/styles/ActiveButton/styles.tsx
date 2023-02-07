import styled from '@emotion/styled';

export const CreateBtn = styled.button`
  position: relative;

  padding: 0;
  width: 80px;
  height: 50px;

  border: 4px solid #cfcbe2;
  outline: none;
  background-color: #bbafec;
  border-radius: 40px;
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

    width: 100%;
    height: 100%;

    border-radius: 40px;
    box-shadow: inset 0px -8px 0px #8e85b8, 0px -8px 0px #c7bafc;
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
    height: 32px;
    transition: 0.13s ease-in-out;
  }
  .btn_text {
    position: relative;
    text-align: center;

    grid-column: 1/5;
    grid-row: 2;
    align-self: end;
    margin: 0;
    font-size: 1.3rem;
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
