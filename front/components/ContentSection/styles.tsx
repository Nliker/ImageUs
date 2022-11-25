import styled from '@emotion/styled';

export const Wrapper = styled.section``;

export const MainContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, auto));
  // grid-template-rows: repeat(3, minmax(100px, auto));
  gap: 1.5rem;
`;

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

export const InfoItem = styled.div`
  // & > span:first-of-type {
  //   position: absolute;
  //   left: 0;
  // }
`