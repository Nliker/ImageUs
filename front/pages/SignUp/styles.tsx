import styled from "@emotion/styled";

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    &>div:not(:first-child) {
        padding-top: 24px;
    }
`;
export const NameBox = styled.div``;
export const EmailBox = styled.div``;
export const PasswordBox = styled.div``;
export const PasswordCheckBox = styled.div`
    display: flex;
    input {
        width: auto;
        height: auto;
    }
`;