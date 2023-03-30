import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  border-radius: 12px;
  background-color: white;
`;

export const Container = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  font-size: 18px;
  padding: 1rem 0;
  text-align: center;

  box-shadow: 0 2px 4px hsla(0, 0%, 81.2%, 0.5);

  h2 {
    margin: 0;
  }

  span {
    display: inline-block;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 20px;

  box-sizing: border-box;
  overflow: auto;

  .content_box {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    margin: 0 40px;
    gap: 1rem;

    .content_list_box {
      width: 100%;

      .content_list {
        position: relative;
        height: 150px;
      }

      .content_list_ul {
        display: table;

        margin: auto;
        padding: 0;
        min-width: 150px;
        border-spacing: 20px;

        li {
          display: table-row;

          vertical-align: middle;
          list-style: none;
          cursor: pointer;

          &:hover {
            background-color: whitesmoke;
          }

          .list_layout {
            display: flex;
            gap: 1rem;
          }

          .list_check_icon {
            display: flex;
            align-items: center;
          }

          .list_info > p {
            margin: 0;

            &:first-of-type {
              margin-bottom: 0.5rem;
            }
          }
        }
      }
    }

    .selected_list_box {
      width: 100%;
      text-align: center;

      .selected_list {
        height: 100px;

        .selected_list_ul {
          display: inline-block;

          min-width: 100px;
          margin: 0;

          li {
            list-style: circle;
          }

          & > li:not(& > li:last-child) {
            margin-bottom: 0.5rem;
          }
        }
      }
    }
  }

  .content_subname {
    text-align: center;
  }
`;
