import React from 'react';

export const CameraImage = ({ style }: { style?: React.CSSProperties }) => (
  <img src="assets/camera_img.png" alt="카메라 이미지" style={style} />
);

export const IntroPageCamera = ({ style }: { style?: React.CSSProperties }) => (
  <img src="assets/intro_page_camera.png" alt="카메라 이미지" style={style} />
);

export const EmptyRoomlistImg = ({
  style,
}: {
  style?: React.CSSProperties;
}) => <img src="assets/empty.png" alt="방 목록 비었음 이미지" style={style} />;
