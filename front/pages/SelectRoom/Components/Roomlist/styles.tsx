import styled from '@emotion/styled';

export const Container = styled.section`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;

  padding: 30px 0;
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

    & > li {
      display: flex;
      justify-content: space-evenly;
    }

    .item_box {
      display: flex;
      align-items: center;

      width: 70%;
      border-radius: 20px;

      transition: all 0.4s ease 0s;
      transform: translate3d(0px, 0px, 0px);
      box-shadow: rgba(50, 50, 50, 0.1) 0px 10px 12px,
        rgba(0, 0, 0, 0.07) 0px 6px 6px;
      background: #ffffff;
      overflow: hidden;

      &:hover {
        transform: translateY(-5px);
      }

      & > a {
        flex: 5;
        border-right: 1px solid rgb(153, 153, 153);

        &:hover {
          background-color: #e7e7e7;
        }
      }

      .item_info {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        text-align: center;

        height: 80px;
        color: black;

        p {
          margin: 0;
        }
      }

      .item_btn {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;
        cursor: pointer;

        &:hover {
          background-color: #e7e7e7;
        }

        svg {
          cursor: pointer;
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
