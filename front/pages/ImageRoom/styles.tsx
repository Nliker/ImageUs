import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;

  height: 100%;
`;

export const MainContainer = styled.main`
  flex: 1 0 auto;
  position: relative;

  .nav_icon {
    position: absolute;
    left: 1.5rem;
    top: 0.5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    z-index: 10;

    width: 50px;
    height: 50px;

    border-radius: 20px;
    background-color: #a3cfcd;
    cursor: pointer;

    &:hover {
      background-color: rgba(212, 211, 213, 0.59);
    }
  }

  .inner_container {
    padding: 2rem;
  }

  .tool_box {
    display: flex;
    justify-content: space-between;

    margin-top: 3rem;

    .sidebar {
      cursor: pointer;
    }

    @media screen and (max-width: 450px) {
      flex-direction: column;
      gap: 1rem;
    }
  }

  .tag {
    padding-top: 3rem;

    .tag_item {
      position: relative;
      display: inline-block;

      height: 2rem;
      padding: 0 20px 0 23px;
      border-radius: 3px 0 0 3px;
      line-height: 2rem;

      color: white;
      background: #868aa6;
      text-decoration: none;

      &::before {
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

      &::after {
        position: absolute;
        right: 0;
        top: 0;

        content: '';
        background: #fff;
        border-bottom: 18px solid transparent;
        border-left: 13px solid #868aa6;
        border-top: 15px solid transparent;
      }
    }
  }

  .select_date {
    display: flex;
    flex-direction: column;

    width: 200px;
    gap: 1rem;
    margin-right: 1rem;

    .date_box {
      display: flex;
      justify-content: space-between;

      &:first-of-type {
        margin-bottom: 0.5rem;
      }
    }
  }

  .content_box {
    position: relative;

    padding: 3rem 0;
  }
`;

export const FilteringOption = styled.div`
  position: relative;

  width: 120px;
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

    width: 100%;
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

  @media screen and (min-width: 768px) {
    width: 180px;
  }
`;

export const UploadButton = styled.div`
  position: fixed;
  top: 65%;
  right: 3%;
  text-align: center;
  z-index: 1;

  width: 50px;
  padding: 7px;
  border-radius: 5px;

  color: #868aa6;
  background-color: ghostwhite;
  box-shadow: 0px 1px 1px 2px #e0e6e6b3;
  cursor: pointer;
`;

export const ImageLoadingContainer = styled.div`
  position: relative;
  top: 30%;
`;
