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

/*
    백엔드 완성 시 채널에 키값을 id로 설정해주게 수정해야됨,
    선택된 항목의 아이콘 색 변경
    선택된 방의 다시 선택 못하게 변경
    체크 해제 할 때 channel명이 아니라 id로 고유한 값으로 필터링해야함
*/

interface Props {
  onCloseModal: (e: any) => void;
}

interface RoomDataType {
  id: number;
  title: string;
  check: boolean;
}

const UploadModal = () => {
  // 백에서 정보를 받아서 check 키값을 추가해서 roomList 객체로 만든다.
  const { roomId } = useParams<{ roomId: string | undefined }>();
  const { mutate } = useSWRConfig();
  const { data: showModalData, mutate: showModalMutate } = useSWR('showModalState');
  const { trigger: uploadImageTrigger, isMutating: isUploadingImage } = useSWRMutation(
    `/room/${roomId}/image`,
    postUploadImage,
  );

  const [selectedRooms, setSelectedRooms] = useState<Array<RoomDataType>>([]);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [tmpImageData, setTmpImageData] = useState<HTMLImageElement | null>(null);
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
          console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
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

  // const getSelectedRoomArray = useCallback(() => {
  //   const extractRooms = selectedRooms.filter((room) => {
  //     return room.check;
  //   });
  //   return [...extractRooms];
  // }, [selectedRooms]);

  // const onClickPrevStep = useCallback(() => {
  //   // 버튼을 누를 때 리사이즈 함수 실행
  //   // handleResize();
  //   setUploadStep((prev) => {
  //     if (prev <= 0) {
  //       return 0;
  //     } else {
  //       return prev - 1;
  //     }
  //   });
  // }, []);

  // const onClickNextStep = useCallback(() => {
  //   // handleResize();
  //   setUploadStep((prev) => {
  //     if (prev >= 2) {
  //       return 2;
  //     } else {
  //       return prev + 1;
  //     }
  //   });
  // }, []);

  // const checkRoomItem = (id: number) => {
  //   const newRoomList = roomList.map((roomData: DRoomData) => {
  //     if (roomData.id === id) {
  //       // 불변성을 유지하기 위해서 아래처럼 새로운 변수에 값을 넣어서 리턴해야 한다.
  //       // 그렇지 않고 위와 같이 쓰면 원래 state의 값이 변경된다. 객체의 참초값을 쓰게 됨으로
  //       const newRoomItem = { ...roomData, check: !roomData.check };
  //       return newRoomItem;
  //     }
  //     return roomData;
  //   });
  //   setChannelList([...newRoomList]);
  // };

  // const inputRoom = useCallback(
  //   (data: RoomDataType) => () => {
  //     if (data.check) {
  //       // checkRoomItem(data.id);
  //       setSelectedRooms((prev) => {
  //         const newData = prev.map((room) => {
  //           if (room.id === data.id) {
  //             return {
  //               ...room,
  //               check: false,
  //             };
  //           } else {
  //             return { ...room };
  //           }
  //         });
  //         return [...newData];
  //       });
  //     } else {
  //       // checkRoomItem(data.id);
  //       setSelectedRooms((prev) => {
  //         const newData = prev.map((room) => {
  //           if (room.id === data.id) {
  //             return {
  //               ...room,
  //               check: true,
  //             };
  //           } else {
  //             return { ...room };
  //           }
  //         });
  //         return [...newData];
  //       });
  //     }
  //   },
  //   [roomList, selectedRooms],
  // );

  // console.log(uploadImageFile?.get('image'));
  return (
    <Wrapper>
      <Background />
      <Container>
        <CloseBtn>
          <div onClick={closeUploadModal}>
            <CgCloseO />
          </div>
        </CloseBtn>
        <ModalContainer>
          <ModalBox>
            <Modal>
              <HeaderContainer>
                <ModalHeaderWrapper>
                  <ModalHeader>
                    <ModalTitle>
                      <h1>방에 사진 업로드</h1>
                    </ModalTitle>
                    <div className={'right_btn'}>
                      <button type="button" onClick={onClickUpload}>
                        업로드
                      </button>
                    </div>
                    {/* {uploadStep !== 0 && (
                      <div className={'left_btn'} onClick={onClickPrevStep}>
                        <button>이전</button>
                      </div>
                    )}
                    {uploadStep !== 2 && (
                      <div className={'right_btn'} onClick={onClickNextStep}>
                        <button>다음</button>
                      </div>
                    )}
                    {uploadStep === 2 && (
                      <div className={'right_btn'}>
                        <button type="button" onClick={onClickUpload}>
                          업로드
                        </button>
                      </div>
                    )} */}
                  </ModalHeader>
                </ModalHeaderWrapper>
              </HeaderContainer>
              <div className={'content_box'}>
                <ModalImageBox onDrop={onDropData} onDragOver={onDragOver}>
                  <ImageDiv image={imageData}></ImageDiv>
                  <ImageCover />
                </ModalImageBox>
                {/* {uploadStep === 0 && (
                  <ModalImageBox onDrop={onDropData} onDragOver={onDragOver}>
                    <ImageDiv image={imageData}></ImageDiv>
                    <ImageCover />
                  </ModalImageBox>
                )} */}
                {/* {uploadStep === 1 && (
                  <ChannelListBox>
                    <ul>
                      {selectedRooms &&
                        selectedRooms.map((data: RoomDataType) => {
                          return (
                            <li onClick={inputRoom(data)} key={data.id}>
                              {data.check ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
                              <span>{data.title}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </ChannelListBox>
                )}
                {uploadStep === 2 && (
                  <div className={'result_box'}>
                    <ImageBox>
                      <ImageDiv image={imageData}></ImageDiv>
                    </ImageBox>
                    <ListBox>
                      <div>
                        <h2>업로드할 채널목록</h2>
                        <ul>
                          {getSelectedRoomArray().map((room) => {
                            return <li key={room.id}>{room.title}</li>;
                          })}
                        </ul>
                      </div>
                    </ListBox>
                  </div>
                )} */}
              </div>
            </Modal>
          </ModalBox>
        </ModalContainer>
      </Container>
    </Wrapper>
  );
};

export default UploadModal;
