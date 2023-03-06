import React, { CSSProperties, MouseEventHandler } from 'react';
import { CreateBtn } from './styles';

interface Props {
  onClickBtn?: MouseEventHandler<HTMLButtonElement>;
  btnTitle: string;
  customStyle?: CSSProperties;
}

const ActionButton = ({ onClickBtn, btnTitle, customStyle }: Props) => {
  return (
    <CreateBtn onClick={onClickBtn} style={customStyle}>
      <div className="btn_content">
        <div className="btn_icon">
          <p className="btn_text">{btnTitle}</p>
        </div>
      </div>
    </CreateBtn>
  );
};

export default ActionButton;
