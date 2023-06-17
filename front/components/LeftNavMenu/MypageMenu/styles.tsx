import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin-top: 2rem;
  overflow: hidden;

  .menu {
    list-style: none;
    display: flex;
    flex-direction: column;

    margin: 0;
    padding: 0;
    gap: 1rem;

    li {
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: #0058aa;
      }

      .link {
        display: inline-block;

        width: 100%;
        height: 100%;

        color: rgb(255, 255, 255, 0.7);
        text-decoration: none;
        white-space: nowrap;
      }

      .menu_active {
        background-color: #0058aa;
      }
    }
  }
`;
