import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const sliceAnimate = keyframes`
    0% {
      bottom: 0px;
    }
    60% {
      width: 100%;

      left: 6px;
    }
    100% {
      width: 100%;

      left: 0px;
      bottom: 0px;

      padding-left: 0;
    }
  `;

const check01Animate = keyframes`
    0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
    }
    50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
    }
    51% {
    width: 0px;
    top: 8px;
    transform: rotate(45deg);
    }
    100% {
    width: 5px;
    top: 8px;
    transform: rotate(45deg);
    }
`;
const check02Animate = keyframes`
    0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
    }
    50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
    }
    51% {
    width: 0px;
    top: 8px;
    transform: rotate(-45deg);
    }
    100% {
    width: 10px;
    top: 8px;
    transform: rotate(-45deg);
    }
`;
const fireworkAnimate = keyframes`
  0% {
    opacity: 1;
    box-shadow: 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    box-shadow: 0 -15px 0 0px #4F29F0, 14px -8px 0 0px #4F29F0, 14px 8px 0 0px #4F29F0, 0 15px 0 0px #4F29F0, -14px 8px 0 0px #4F29F0, -14px -8px 0 0px #4F29F0;
  }
  `;

export const Container = styled.div`
  position: relative;

  background: white;
  padding: 10px 45px;

  & .check_label_box {
    display: inline-flex;
    align-items: center;

    height: 35px;

    cursor: pointer;
  }
`;

export const DataCheckInput = styled.input`
  display: grid;
  align-items: center;
  position: relative;

  height: 15px;
  width: 15px;
  border: 0;
  margin: 0 15px 0 0;

  background: #fff;
  outline: none;
  appearance: none;
  cursor: pointer;

  &:checked::before {
    animation: ${check01Animate} 0.4s ease forwards;
  }

  &:checked::after {
    animation: ${check02Animate} 0.4s ease forwards;
  }

  &:checked + label {
    font-weight: bolder;
  }

  &:checked + label::before {
    animation: ${sliceAnimate} 0.4s ease forwards;
    //   background: gray;
    // width: 0px;
  }

  &:checked + label::after {
    animation: ${fireworkAnimate} 0.5s ease forwards 0.1s;
  }

  &::before {
    width: 0px;
    right: 60%;
    transform-origin: right bottom;
  }

  &::after {
    width: 0px;
    left: 40%;
    transform-origin: left bottom;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    top: auto;
    background: #4f29f0;
    border-radius: 2px;
  }
`;

export const DataLabel = styled.label`
  position: relative;
  display: grid;
  align-items: center;

  width: fit-content;

  color: #414856;
  cursor: pointer;
  transition: color 0.3s ease;

  &::before {
    height: 2px;
    width: 8px;
    left: -27px;
    border-radius: 2px;

    background: #4f29f0;
    transition: background 0.3s ease;
  }

  &::after {
    height: 4px;
    width: 4px;
    top: 8px;
    left: -25px;
    border-radius: 50%;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
  }
`;