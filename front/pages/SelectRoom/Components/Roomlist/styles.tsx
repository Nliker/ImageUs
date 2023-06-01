import styled from '@emotion/styled';

export const Container = styled.section`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;

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
    padding: 30px 0;
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

      border: 1px solid #ddd;
      transition: all 0.4s ease 0s;
      transform: translate3d(0px, 0px, 0px);
      background: #ffffff;
      overflow: hidden;

      &:hover {
        transform: translateY(-5px);
      }

      & > a {
        flex: 5;
        border-right: 1px solid #ddd;

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

  @media screen and (max-width: 768px) {
    .room_list {
      .item_box {
        box-shadow: 0 4px 2px 0 rgba(0, 0, 0, 0.16),
          0 2px 4px 0 rgba(0, 0, 0, 0.12);
      }
    }
  }
`;

export const EmptyRoom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
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

export const LoadingContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  position: relative;
  top: 40%;
`;
