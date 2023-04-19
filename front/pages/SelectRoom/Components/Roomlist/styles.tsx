import styled from '@emotion/styled';

export const Container = styled.section`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  a {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  .room_list {
    display: flex;
    flex-direction: column;

    width: 100%;
    padding: 0;
    margin: 0;
    gap: 1.5rem;

    .item_box {
      width: 80%;
      margin: auto;
      border-radius: 20px;

      transition: all 0.4s ease 0s;
      transform: translate3d(0px, 0px, 0px);
      box-shadow: rgba(50, 50, 50, 0.1) 0px 10px 12px,
        rgba(0, 0, 0, 0.07) 0px 6px 6px;
      background: #ffffff;
      cursor: pointer;

      &:hover {
        transform: translateY(-5px);
      }

      & > a {
        width: 100%;
      }

      .item_info {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        height: 100px;
        color: black;

        p {
          margin: 0;
        }
      }
    }
  }
`;

export const EmptyRoom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2.5rem;

  .text {
    font-size: 1.5rem;
  }

  @media screen and (min-width: 768px) {
    .text {
      font-size: 1.4rem;
    }
  }
`;
