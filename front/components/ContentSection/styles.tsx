import styled from '@emotion/styled';

export const Wrapper = styled.section`
  /* height: 100%; */
  padding: 0 20px;
`;

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
    color: white;
    line-height: 2rem;

    background: #5b7cfa;
    text-decoration: none;
  }

  .tag::before {
    position: absolute;
    width: 6px;
    top: 13px;
    left: 10px;

    height: 6px;
    background: #fff;
    border-radius: 10px;
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

export const FilterBox = styled.div`
  position: relative;

  .select_date {
    display: inline-flex;
    align-items: center;

    gap: 0.5rem;
    position: absolute;
    right: 15px;
    top: 70px;
  }
`;

export const FilteringOption = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;

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

    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    z-index: 3;
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

    width: 209px;
    background-color: #fff;
    border-radius: 4px;
    z-index: 10;
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
`;

export const ImageCard = styled.div`
  overflow: hidden;
  padding-bottom: 100%;
  position: relative;
`;

export const ImageInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: whitesmoke;
`;

export const InfoItem = styled.div``;
