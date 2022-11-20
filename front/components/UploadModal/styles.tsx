import styled from "@emotion/styled";

export const Wrapper = styled.div`
`;

export const Container = styled.div`
position: static;
`;


export const Background = styled.div`
    position: fixed;
    z-index: 1000;
    right: 0;
    bottom: 0;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.65);
`;

export const CloseBtn = styled.div`
    position: absolute;
    display: flex;
    z-index: 1001;
    top: 10px;
    right: 10px;
    padding: 8px;
    svg {
        width: 25px;
        height: 25px;
        color: white;
        cursor: pointer;
    }
`;


export const ModalContainer = styled.div``;

export const Modal = styled.div``;