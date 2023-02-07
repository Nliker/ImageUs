import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 100%;

  border-radius: 6px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  border-radius: 12px;

  background-color: white;
`;

export const Title = styled.div`
  flex: 1;

  text-align: center;
  font-size: 18px;
  padding: 5px 0;

  span {
    display: inline-block;
  }
`;

export const Content = styled.div`
  flex: 6;

  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;

  .content_box {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    margin: 0 40px;

    overflow: auto;
  }

  .content_subname {
    display: inline-block;
  }

  .not_selected_ul {
    display: table;

    margin: 0;
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

        &:first-child {
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  .selected_member_ul {
    margin: 0;

    li {
      list-style: circle;
    }

    & > li:not(& > li:last-child) {
      margin-bottom: 0.5rem;
    }
  }

  .content_btn {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
