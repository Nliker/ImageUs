import styled from '@emotion/styled';

export const ContentBox = styled.div`
  position: relative;
  overflow: visible;

  border-radius: 12px;

  a {
    text-decoration: none;
    color: black;
  }
  a:active {
    color: black;
  }
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ImageCard = styled.div`
  overflow: hidden;
  padding-bottom: 100%;
  position: relative;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  background-color: whitesmoke;
`;

export const ImageInfo = styled.div`
  width: 100%;
`;

export const EditBtn = styled.div`
  position: absolute;

  width: 25px;
  height: 40px;
  right: 10px;

  cursor: pointer;

  svg {
    display: block;

    width: 25px;
    height: 100%;
  }
`;

export const EditImageMenu = styled.div`
  position: absolute;
  bottom: 45px;

  width: 150px;
  left: 218px;
  z-index: 100;

  box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 30%),
    0 0.0625rem 0.125rem rgb(0 0 0 / 20%);
  border-radius: 12px;
  background-color: mintcream;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0.65em;

    width: 0;
    height: 0;

    border: 0.55rem solid transparent;
    border-bottom: none;
    border-top-color: mintcream;
    filter: drop-shadow(0 0.125rem 0.0625rem rgba(0, 0, 0, 0.1));
  }

  .delete_img {
    cursor: pointer;

    &:hover {
      background-color: red;
    }
  }
`;
