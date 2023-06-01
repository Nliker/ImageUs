import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: fit-content;
  min-width: 100%;
  padding: 1rem 0.5rem;
  box-sizing: border-box;
`;

export const Subtitle = styled.div`
  display: inline-flex;

  align-items: center;
  cursor: pointer;
`;

export const Collapse = styled.span<{ collapse: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;

  cursor: pointer;

  svg {
    transition: transform 0.3s, opacity 0.1s;
    ${({ collapse }) =>
      collapse &&
      `
    transform: rotate(90deg);
    `}
  }
`;

export const Container = styled.div`
  position: relative;

  padding: 10px 25px;
  background: white;

  .check_box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > button {
      width: 50px;
      height: 25px;
      padding: 0px;
      font-size: 15px;
    }
  }

  & .check_label_box {
    display: inline-flex;
    align-items: center;

    height: 35px;

    cursor: pointer;

    .mark_box {
      display: flex;
      position: absolute;
      left: 0px;

      gap: 5px;

      span {
        border-radius: 5px;
      }

      .room_manager_mark {
        background-color: antiquewhite;
      }

      .onself_mark {
        background-color: lavender;
      }
    }
  }
`;

export const CreateBtnBox = styled.div`
  padding: 1rem;
  text-align: center;
`;
