import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

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
    box-shadow: 0 0 0 -2px #0058AA, 0 0 0 -2px #0058AA, 0 0 0 -2px #0058AA, 0 0 0 -2px #0058AA, 0 0 0 -2px #0058AA, 0 0 0 -2px #0058AA;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    box-shadow: 0 -15px 0 0px #0058AA, 14px -8px 0 0px #0058AA, 14px 8px 0 0px #0058AA, 0 15px 0 0px #0058AA, -14px 8px 0 0px #0058AA, -14px -8px 0 0px #0058AA;
  }
  `;

export const DataCheckLabel = styled.input<{ boxName: string }>`
  display: grid;
  align-items: center;
  position: relative;

  height: 20px;
  width: 20px;
  border: 0;

  border-radius: 5px;
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

  &:checked ~ label {
    font-weight: bolder;

    .item_text {
      color: rgb(0, 0, 0, 0.5);
    }
  }

  &:checked ~ label::before {
    width: 0px;
  }

  &:checked ~ label::after {
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

    margin-top: 3px;
    border-radius: 2px;
    background: #0058aa;
  }
`;

export const DataLabel = styled.label`
  position: relative;
  display: grid;
  align-items: center;
  grid-auto-flow: column;

  width: fit-content;

  transition: color 0.3s ease;
  color: #414856;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
  }

  &::before {
    height: 2px;
    top: 10px;
    left: -32.5px;
    border-radius: 2px;

    background: #0058aa;
    transition: background 0.3s ease;
  }

  &::after {
    width: 4px;
    height: 4px;
    top: 10px;
    left: -32.5px;
    border-radius: 50%;
  }
`;
