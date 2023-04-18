import styled from '@emotion/styled';

export const MainRoomList = styled.article`
  width: 100%;
  height: 100%;
  max-width: none;
  margin: auto;

  box-shadow: none;
  text-align: center;
  border-radius: 12px;

  header {
    position: relative;

    height: 100px;
    background-image: repeating-radial-gradient(
        circle at 15%,
        transparent 0%,
        transparent 10%,
        rgba(54, 89, 219, 0.33) 10%,
        rgba(54, 89, 219, 0.33) 17%
      ),
      linear-gradient(to right, #5b7cfa, #3659db);

    overflow: hidden;
    color: #fff;

    & > h1 {
      position: relative;
      top: 50%;

      margin: 0;

      transform: translateY(-50%);
    }
  }

  .content_box {
    position: relative;
    display: inline-block;

    width: 100%;
    height: calc(100% - 100px);

    overflow: hidden;
    border-radius: 12px;

    .content_list {
      height: calc(100% - 80px);

      .room_list {
        display: grid;
        grid-template-rows: repeat(auto-fill, 50px);
        row-gap: 30px;

        border-radius: 0 0 12px 12px;
        padding: 15px 60px 20px;

        list-style: none;
        background-color: #fff;

        & > a {
          height: 100%;

          color: black;
          text-decoration: none;

          & > li {
            display: grid;
            align-items: center;

            height: 100%;
            padding: 10px 30px 10px 10px;
            box-sizing: border-box;

            border-radius: 10px;
            background-color: #fff;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
            transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98),
              box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);

            &:hover {
              transform: scale(1.2);
              box-shadow: 0 9px 47px 11px rgba(51, 51, 51, 0.18);
            }
          }
        }
      }
    }

    .create_room_btn {
      position: absolute;
      bottom: 0;

      width: 100%;
      padding: 15px 0;
      border-top: 1px solid #e2eded;
    }
  }

  @media screen and (min-width: 768px) {
    height: calc(100% - 30px);
    max-width: 600px;

    box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);

    header {
      height: 130px;
      border-radius: 12px 12px 0 0;
    }

    .content_box {
      height: calc(100% - 130px);
    }
  }
`;
