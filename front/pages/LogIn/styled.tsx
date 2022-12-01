import styled from "@emotion/styled";

export const InputDiv = styled.div`
`

export const EmailInputContainer = styled.div`
`
export const PasswordInputContainer = styled.div`
  margin-top: 20px;
`;

export const InputBox = styled.div`
  input {
    width: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    box-shadow: 0 0 3px #eee;    
    border-radius: 4px;
    color: #202124;
    font-size: 17px;
    height: 56px;
    margin: 1px 1px 0 1px;
    padding: 13px 15px;
  }
  label {
    display: block;
    text-align: left;
    &:not(.pwcheck-label) {
      padding-bottom: 10px;
      // color: #d93025;
    }
  }
`;

export const CheckBox = styled.div`
  display: block;
  margin-top: 20px;
  input {
    transform: scale(1.5);
  }
`;

export const SubmitBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

// export const MoveBox = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 40px;
// `;

