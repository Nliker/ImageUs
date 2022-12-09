import React, { MouseEventHandler } from 'react';
import { CreateBtn } from './styles';

interface Props {
    onClickBtn?: MouseEventHandler<HTMLButtonElement>;
    btnTitle: string;
}

const ActionButton = ({ onClickBtn, btnTitle }: Props) => {
  return (
    <CreateBtn onClick={onClickBtn}>
        <div className="btn_content">
          <div className="btn_icon">
            <p className="btn_text">{btnTitle}</p>
          </div>
        </div>
    </CreateBtn>
  );
};

export default ActionButton;
