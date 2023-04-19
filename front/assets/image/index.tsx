import React from 'react';

export const BackgroundImg = () => (
  <img src="assets/main_background_img.png" alt="배경 이미지" />
);

export const EmptyRoomlistImg = ({ style }: { style: React.CSSProperties }) => (
  <img src="assets/empty.png" alt="방 목록 비었음 이미지" style={style} />
);
