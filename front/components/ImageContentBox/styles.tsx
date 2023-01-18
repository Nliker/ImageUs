import styled from '@emotion/styled';

export const ContentBox = styled.div`
  border-radius: 12px;
  overflow: hidden;
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
  position: relative;
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
  right: 10px;
  height: 100%;

  cursor: pointer;

  svg {
    display: block;

    width: 25px;
    height: 100%;
  }
`;
