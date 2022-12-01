import styled from '@emotion/styled';

export const Wrapper = styled.div`
  @media screen and (min-width: 601px) {
    // bottom: 0;
    // left: 0;
    // right: 0;
    // top: 0;
    // overflow: hidden;
    // position: absolute;
    // z-index: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    &:before,
    &:after {
      // min-height: 30px;
      flex-grow: 1;
      content: '';
      display: block;
      height: 24px;
      box-sizing: border-box;
    }
  }
`;

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  padding: 24px 24px 36px;
  @media screen and (min-width: 450px) {
    padding: 48px 40px 36px;
  }
  @media screen and (min-width: 601px) {
    display: block;
    width: 450px;
    margin: 0 auto;
    border: 1px solid #dadce0;
    border-radius: 8px;
  }
`;

export const InnerContainer = styled.div`
  padding-top: 50px;
`;

