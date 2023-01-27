import styled from '@emotion/styled';

export const Wrapper = styled.section`
  height: calc(100% - 40px);
  // overflow-y: auto;
`;

export const MainContainer = styled.main``;

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

// export const PostImage = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, auto);
//   gap: 1rem;

//   @media screen and (min-width: 450px) {
//     grid-template-columns: repeat(3, auto);
//   }

//   @media screen and (min-width: 1024px) {
//     grid-template-columns: repeat(4, auto);
//   }
// `;
