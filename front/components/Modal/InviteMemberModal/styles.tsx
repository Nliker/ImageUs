import styled from '@emotion/styled';

export const ContentBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  height: 100%;

  .friend_list {
    display: flex;
    flex-direction: column;
    flex: 8;

    width: 100%;

    .ul_container {
      flex: 1 0 auto;

      ul {
        display: flex;
        flex-direction: column;
        justify-content: center;

        height: 100%;
        margin: auto;
        padding: 0 1rem;
        gap: 0.7rem;

        li {
          border-radius: 6px;
          vertical-align: middle;
          list-style: none;
          cursor: pointer;

          &:hover {
            background-color: whitesmoke;
          }

          .list_layout {
            display: flex;
            justify-content: center;

            gap: 1rem;
          }

          .list_check_icon {
            display: flex;
            align-items: center;
          }

          .list_info > p {
            margin: 0;
            text-align: left;
          }
        }
      }
    }
  }

  .selected_list {
    display: flex;
    flex-direction: column;
    flex: 8;

    width: 100%;

    .ul_container {
      flex: 1 0 auto;

      ul {
        display: grid;
        justify-content: center;

        margin: auto;
        padding: 0 1rem;
        gap: 0.7rem;

        li {
          list-style: circle;
        }
      }
    }
  }

  .content_btn {
    flex: 2;
  }
`;
