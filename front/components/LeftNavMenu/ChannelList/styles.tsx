import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: fit-content;
  min-width: 100%;
  padding: 1rem 0.5rem;
  box-sizing: border-box;
`;

export const Subtitle = styled.div`
  display: flex;
  align-items: center;

  margin: 0 1rem;

  .toggle_channel {
    display: flex;
    align-items: center;

    gap: 0.5rem;
    color: rgb(0, 0, 0, 0.7);
    cursor: pointer;
  }

  .create_room_btn {
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
  display: flex;
  flex-direction: column;
  position: relative;

  gap: 1rem;
  padding: 1rem;

  .check_box {
    display: block;

    height: 35px;
    line-height: 35px;

    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    color: rgb(255, 255, 255, 0.7);

    &.active,
    &:hover {
      background-color: #0058aa;
    }
  }

  .no_room {
    height: 32px;
    margin-left: 1.5rem;

    line-height: 32px;
    span {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

export const CreateBtnBox = styled.div`
  padding: 1rem;
  text-align: center;
`;
