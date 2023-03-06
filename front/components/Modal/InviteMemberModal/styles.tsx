import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 450px;
  height: 80%;
  border-radius: 6px;

  @media screen and (min-width: 768px) {
    width: 600px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  border-radius: 12px;

  background-color: white;
`;

export const Title = styled.div`
  font-size: 18px;
  padding: 5px 0;
  text-align: center;

  span {
    display: inline-block;
  }
`;

export const Content = styled.div`
  width: 100%;
  padding-bottom: 20px;

  box-sizing: border-box;
  overflow: auto;

  .content_box {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0 40px;

    .content_select_box {
      width: 100%;

      .not_selected_ul {
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

    .content_selected_box {
      width: 100%;
      text-align: center;

      .selected_member_ul {
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

  .content_subname {
    text-align: center;
  }

  .content_btn {
    margin-top: 40px;
  }
`;
