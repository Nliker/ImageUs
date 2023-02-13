import styled from '@emotion/styled';

// export const ProfileModal = styled.div``;

// export const LogOutButton = styled.button``;

export const Wrappper = styled.div`
  height: calc(100% - 40px);
  font-size: 0.85rem;
  overflow: auto;
`;

export const ContentWrappper = styled.div`
  height: 100%;
  main {
    display: flex;

    height: 100%;

    section {
      height: 100%;
    }
  }
`;

export const MainIntroduction = styled.section`
  padding: 6rem 0;

  & > h1 {
    text-align: center;

    font-size: 2.75rem;

    .brand_logo {
      color: #ecb22e;
    }
  }
`;

export const MainRoomList = styled.article`
  width: 100%;
  height: calc(100% - 30px);
  max-width: 600px;
  border-radius: 12px;

  margin: auto;
  text-align: center;

  box-shadow: 2px 2px 4px 2px rgb(0 0 0 / 30%);

  .content_box {
    display: inline-block;

    width: 100%;
    height: calc(100% - 130px);

    overflow: hidden;
    border-radius: 12px;
  }

  header {
    position: relative;

    height: 130px;
    background-image: repeating-radial-gradient(
        circle at 15%,
        transparent 0%,
        transparent 10%,
        rgba(54, 89, 219, 0.33) 10%,
        rgba(54, 89, 219, 0.33) 17%
      ),
      linear-gradient(to right, #5b7cfa, #3659db);
    border-radius: 12px 12px 0 0;

    overflow: hidden;
    color: #fff;

    & > h1 {
      position: relative;
      top: 50%;
      transform: translateY(-50%);

      margin: 0;
    }
  }

  .room_list {
    display: grid;
    grid-template-rows: repeat(auto-fill, 50px);
    row-gap: 30px;

    border-radius: 0 0 12px 12px;
    padding: 15px 60px 20px;
    background-color: #fff;

    list-style: none;

    & > a {
      height: 100%;

      color: black;
      text-decoration: none;

      & > li {
        display: grid;
        align-items: center;

        height: 100%;
        padding: 10px 30px 10px 10px;
        border-radius: 10px;
        box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
        box-sizing: border-box;

        overflow: hidden;
        cursor: pointer;
        transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98),
          box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
        background-color: #fff;
        cursor: pointer;

        &:hover {
          transform: scale(1.2);
          box-shadow: 0 9px 47px 11px rgba(51, 51, 51, 0.18);
        }
      }
    }
  }
`;
