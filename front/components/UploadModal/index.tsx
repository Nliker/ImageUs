import React, { useCallback, DragEvent, useState } from 'react';
import {
  Background,
  CloseBtn,
  Container,
  ImageCover,
  ImageDiv,
  Modal,
  ModalBox,
  ModalContainer,
  ModalHeader,
  ModalImageBox,
  ModalTitle,
  Wrapper,
} from './styles';
import { CgCloseO } from 'react-icons/cg';

interface Props {
  onCloseModal: (e: any) => void;
}

const UploadModal = ({ onCloseModal }: Props) => {
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);

  const onDropData = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const formData: any = new FormData();
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file?.name);
          formData.append('image', file);
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
        formData.append('image', e.dataTransfer.files[i]);
      }
    }
    setDragOver(false);
    // 현재 폴더에 저장된 테스트 이미지로 적용
    const image = new Image();
    image.src = 'image_test.png';
    if (image) setImageData(image);
    console.log(typeof image);

    // 이미지 테스트
    // for (const entries of formData.values()) {
    //   console.log(entries);
    // }
  }, []);

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, [])
  
  return (
    <Wrapper>
      <Background />
      <Container>
        <CloseBtn>
          <div onClick={onCloseModal}>
            <CgCloseO />
          </div>
        </CloseBtn>
        <ModalContainer>
          <ModalBox>
            <Modal>
              <ModalHeader>
                <ModalTitle>
                  <h1>사진 업로드</h1>
                </ModalTitle>
              </ModalHeader>
              <ModalImageBox onDrop={onDropData} onDragOver={onDragOver}>
                <ImageDiv image={imageData}></ImageDiv>
                <ImageCover />
              </ModalImageBox>
            </Modal>
          </ModalBox>
        </ModalContainer>
      </Container>
    </Wrapper>
  );
};

export default UploadModal;
