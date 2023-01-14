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

export const ImageInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: whitesmoke;
`;

export const InfoItem = styled.div``;
