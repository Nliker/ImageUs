import styled from '@emotion/styled';

export const Wrapper = styled.div`
  padding: 1.5rem 0;
  box-sizing: border-box;
`;

export const Subtitle = styled.div`
  display: flex;
  align-items: center;

  margin: 0 1rem;

  .toggle_memberlist {
    display: flex;
    align-items: center;

    gap: 0.5rem;
    color: rgb(0, 0, 0, 0.7);
    cursor: pointer;
  }

  .invite_btn {
    width: 25px;
    height: 25px;
    margin-left: auto;
    border-radius: 8px;

    color: rgb(0, 0, 0, 0.7);
    cursor: pointer;

    &:hover {
      background-color: rgba(212, 211, 213, 0.59);
    }
  }
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
  display: flex;
  flex-direction: column;

  padding: 1rem;
  gap: 0.5rem;

  & .check_label_box {
    display: flex;
    align-items: center;

    height: 35px;
    padding: 0 10px;
    gap: 1rem;

    border-radius: 5px;

    .right_box {
      display: flex;

      margin-left: auto;
      gap: 1rem;

      .mark {
        display: flex;
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
  }
`;

export const CreateBtnBox = styled.div`
  padding: 1rem;
  text-align: center;
`;
