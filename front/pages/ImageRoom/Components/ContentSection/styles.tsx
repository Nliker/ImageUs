import styled from '@emotion/styled';

export const MainContainer = styled.main`
  position: relative;

  .tag {
    position: relative;
    display: inline-block;

    font-size: 1.3rem;
    height: 2rem;
    padding: 0 20px 0 23px;
    margin: 0 20px 20px 0;
    border-radius: 3px 0 0 3px;
    line-height: 2rem;

    color: white;
    background: #5b7cfa;
    text-decoration: none;
  }

  .tag::before {
    position: absolute;
    top: 13px;
    left: 10px;

    width: 6px;
    height: 6px;
    border-radius: 10px;

    background: #fff;
    box-shadow: inset 0 1px rgb(0 0 0 / 25%);
    content: '';
  }

  .tag::after {
    position: absolute;
    right: 0;
    top: 0;

    content: '';
    background: #fff;
    border-bottom: 18px solid transparent;
    border-left: 13px solid #5b7cfa;
    border-top: 15px solid transparent;
  }
`;

export const ActiveContentBox = styled.div`
  position: relative;

  .active_icon_box {
    position: absolute;
    top: 20px;
    left: 50px;
    display: flex;

    gap: 1rem;

    .sidebar_icon {
      cursor: pointer;
    }

    .leave_icon {
      cursor: pointer;
    }
  }
`;

export const FilteringOption = styled.div`
  position: absolute;
  top: -65px;
  right: 0px;

  width: 180px;
  height: 20px;
  padding: 12px 14px;

  background-color: #fff;
  border: 1px solid #e2eded;
  border-color: #eaf1f1 #e4eded #dbe7e7 #e4eded;
  border-radius: 4px;
  cursor: pointer;

  #options-view-button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;

    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;

    cursor: pointer;
  }

  #select-button {
    display: flex;
    justify-content: space-around;
    align-items: center;

    height: 100%;

    #chevrons {
      display: flex;
      flex-direction: column;
    }
  }

  .options {
    position: absolute;
    top: 45px;
    right: 0;
    left: 0;
    z-index: 10;

    width: 209px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0.125rem 0.05rem rgb(0 0 0 / 30%),
      0 0.0625rem 0.125rem rgb(0 0 0 / 20%);
    text-align: center;

    .option {
      padding: 5px 0;
    }

    & .option:hover {
      background-color: whitesmoke;
    }
  }
`;

export const ContentBox = styled.div`
  position: absolute;
  top: 120px;

  width: 100%;
  padding-bottom: 40px;

  .content_box_pos {
    position: relative;

    width: 85%;
    margin: auto;

    .select_box::after {
      content: '';
      display: block;
      clear: both;
    }

    .select_date {
      display: flex;
      flex-direction: column;
      float: right;

      margin-bottom: 30px;
      gap: 0.5rem;

      .select_date_c {
        display: inline-flex;
        justify-content: end;

        label {
          margin-right: 8px;
        }
      }

      .select_data_btn {
        display: flex;
        justify-content: right;
        button {
          font-size: 0.75rem;
        }
      }

      @media screen and (min-width: 510px) {
        flex-direction: row;
        align-items: center;

        gap: 1rem;
      }
    }
  }
`;

export const ImageCard = styled.div`
  position: relative;

  padding-bottom: 100%;
  overflow: hidden;
`;

export const ImageInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  text-align: center;
  background-color: whitesmoke;
`;
