import React, { useCallback, DragEvent, useState, useEffect } from 'react';
import {
  Background,
  ChannelListBox,
  CloseBtn,
  Container,
  HeaderContainer,
  ImageBox,
  ImageCover,
  ImageDiv,
  ListBox,
  Modal,
  ModalBox,
  ModalContainer,
  ModalHeader,
  ModalHeaderWrapper,
  ModalImageBox,
  ModalTitle,
  Wrapper,
} from './styles';
import { CgCloseO } from 'react-icons/cg';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import useSWR, { SWRConfig, useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { DRoomData } from '@typing/db';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { postUploadImage } from '@utils/imageFetcher';
import { Button } from '@styles/Button';
import { BiImageAdd } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';

interface RoomDataType {
  id: number;
  title: string;
  check: boolean;
}

const UploadModal = () => {
  // 백에서 정보를 받아서 check 키값을 추가해서 roomList 객체로 만든다.
  const { roomId } = useParams<{ roomId: string | undefined }>();
  const { mutate } = useSWRConfig();
  const { data: showModalData, mutate: showModalMutate } =
    useSWR('showModalState');
  const { trigger: uploadImageTrigger, isMutating: isUploadingImage } =
    useSWRMutation(`/room/${roomId}/image`, postUploadImage);

  const [selectedRooms, setSelectedRooms] = useState<Array<RoomDataType>>([]);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [tmpImageData, setTmpImageData] = useState<HTMLImageElement | null>(
    null,
  );
  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);
  const [uploadImageFile, setUploadImageFile] = useState<FormData | null>(null);

  // 이미지가 로드되고 난 뒤에 넓이와 높이 값을 전달한다.
  // 업로드 후에 이미지 브라우저 메모리 삭제

  useEffect(() => {
    const debounce = setTimeout(() => {
      return setImageData(tmpImageData);
    }, 300);
    return () => clearTimeout(debounce);
  }, [tmpImageData]);

  const closeUploadModal = useCallback(() => {
    showModalMutate(
      {
        ...showModalData,
        upload: false,
      },
      false,
    );
  }, [showModalData]);

  const onClickUpload = useCallback(() => {
    if (!uploadImageFile) {
      alert('이미지를 등록해주세요');
      return;
    }
    uploadImageTrigger({ uploadImageFile }).then(() => {
      mutate(`/room/${roomId}/unread-imagelist`);
    });
    closeUploadModal();
  }, [uploadImageFile]);

  const onDropData = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
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
          console.log(
            '... file[' + i + '].name = ' + e.dataTransfer.files[i].name,
          );
          formData.append('image', e.dataTransfer.files[i]);
        }
      }
      setDragOver(false);

      // 이미지를 브라우저 메모리에 저장해서 미리보기를 보여준다.
      // 이미지가 업로드 되면 그 때 revokeObjectURL(src)를 사용해서 메모리 누수를 방지한다.
      // 이미지가 로드되고 난 뒤에 값을 태그에 전달한다. useEffect 활용

      const imageURLs = URL.createObjectURL(formData.get('image'));
      const image = new Image();
      image.src = imageURLs;
      console.log(imageURLs);
      setTmpImageData(image);
      setUploadImageFile(formData);
    },
    [imageData],
  );

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  return (
    <ModalContainer>
      <ModalBox>
        <Modal>
          <HeaderContainer>
            <ModalHeaderWrapper>
              <ModalHeader>
                <ModalTitle>
                  <h1>방에 사진 업로드</h1>
                </ModalTitle>
              </ModalHeader>
            </ModalHeaderWrapper>
          </HeaderContainer>
          <div className={'content_box'}>
            <ModalImageBox onDrop={onDropData} onDragOver={onDragOver}>
              <ImageDiv image={imageData}>
                {!imageData && (
                  <div className="default_image">
                    <IconContext.Provider
                      value={{
                        size: '50%',
                        style: { display: 'inline-block' },
                      }}
                    >
                      <BiImageAdd />
                    </IconContext.Provider>
                    <span>이미지를 끌어 놓으세요</span>
                  </div>
                )}
              </ImageDiv>
              <ImageCover />
            </ModalImageBox>
          </div>
          <div className={'upload_btn'}>
            <Button onClick={onClickUpload}>업로드</Button>
          </div>
        </Modal>
      </ModalBox>
    </ModalContainer>
    // <Wrapper>
    //   {/* <Background /> */}
    //   <Container>
    //     {/* <CloseBtn>
    //       <div onClick={closeUploadModal}>
    //         <CgCloseO />
    //       </div>
    //     </CloseBtn> */}
    //     <ModalContainer>
    //       <ModalBox>
    //         <Modal>
    //           <HeaderContainer>
    //             <ModalHeaderWrapper>
    //               <ModalHeader>
    //                 <ModalTitle>
    //                   <h1>방에 사진 업로드</h1>
    //                 </ModalTitle>
    //               </ModalHeader>
    //             </ModalHeaderWrapper>
    //           </HeaderContainer>
    //           <div className={'content_box'}>
    //             <ModalImageBox onDrop={onDropData} onDragOver={onDragOver}>
    //               <ImageDiv image={imageData}>
    //                 {!imageData && (
    //                   <div className="default_image">
    //                     <IconContext.Provider
    //                       value={{
    //                         size: '50%',
    //                         style: { display: 'inline-block' },
    //                       }}
    //                     >
    //                       <BiImageAdd />
    //                     </IconContext.Provider>
    //                     <span>이미지를 끌어 놓으세요</span>
    //                   </div>
    //                 )}
    //               </ImageDiv>
    //               <ImageCover />
    //             </ModalImageBox>
    //           </div>
    //           <div className={'upload_btn'}>
    //             <Button onClick={onClickUpload}>업로드</Button>
    //           </div>
    //         </Modal>
    //       </ModalBox>
    //     </ModalContainer>
    //   </Container>
    // </Wrapper>
  );
};

export default UploadModal;
