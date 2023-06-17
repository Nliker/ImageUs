import styled from '@emotion/styled';

export const ImageLayout = styled.div<{ width?: number }>`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(140px, 260px));

  gap: 3rem;
`;

export const NotImageData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 30px;
`;

export const Target = styled.div``;

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
