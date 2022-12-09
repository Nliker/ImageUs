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
import useSWR from 'swr';
import getDataFetcher from '@utils/getUserRoomListFetcher';
import getUserDataFetcher from '@utils/getUserRoomListFetcher';
import getUserRoomListFetcher from '@utils/getUserRoomListFetcher';
import { IRoomData } from '@typing/db';

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


// const dummyData = [
//   {
//     id: 1,
//     name: '채널1',
//     check: false,
//   },
//   {
//     id: 2,
//     name: '채널2',
//     check: false,
//   },
//   {
//     id: 3,
//     name: '채널3',
//     check: false,
//   },
//   {
//     id: 4,
//     name: '채널4',
//     check: false,
//   },
//   {
//     id: 5,
//     name: '채널5',
//     check: false,
//   },
// ];

const UploadModal = () => {
  // 백에서 정보를 받아서 check 키값을 추가해서 roomList 객체로 만든다.
  const user_id = sessionStorage.getItem('USER_ID');
  const { data: roomList } = useSWR(`/user/${user_id}/roomlist`, getUserRoomListFetcher,{
    dedupingInterval: 4000
  });
  const [selectedRooms, setSelectedRooms] = useState<Array<RoomDataType>>([]);

  const { data, mutate: showModalMutate } = useSWR('showModalState');
  const [uploadStep, setUploadStep] = useState<number>(0);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [tmpImageData, setTmpImageData] = useState<HTMLImageElement | null>(null);
  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);

  const headerName = ['사진 업로드', '채널 선택', '결과물'];

  // 이미지가 로드되고 난 뒤에 넓이와 높이 값을 전달한다.
  // 업로드 후에 이미지 브라우저 메모리 삭제

  useEffect(() => {
    if (!roomList) return;
    const tmpRoomList = roomList.map((data: IRoomData) => {
      return {
        ...data,
        check: false
      }
    });
    setSelectedRooms([...tmpRoomList]);
  }, [roomList])

  useEffect(() => {
    const debounce = setTimeout(() => {
      return setImageData(tmpImageData);
    }, 300);
    return () => clearTimeout(debounce);
  }, [tmpImageData]);

  const onClickCloseModal = () => {
    showModalMutate(
      {
        ...data,
        upload: false,
        image: false,
      },
      false,
    );
  };

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

      // setImageURLs(URL.createObjectURL(formData.get('image')));
      const imageURLs = URL.createObjectURL(formData.get('image'));
      const image = new Image();
      image.src = imageURLs;

      setTmpImageData(image);
    },
    [imageData],
  );

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onClickPrevStep = useCallback(() => {
    // 버튼을 누를 때 리사이즈 함수 실행
    // handleResize();
    setUploadStep((prev) => {
      if (prev <= 0) {
        return 0;
      } else {
        return prev - 1;
      }
    });
  }, []);

  const onClickNextStep = useCallback(() => {
    // handleResize();
    setUploadStep((prev) => {
      if (prev >= 2) {
        return 2;
      } else {
        return prev + 1;
      }
    });
  }, []);

  // const checkRoomItem = (id: number) => {
  //   const newRoomList = roomList.map((roomData: IRoomData) => {
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

  const inputRoom = useCallback(
    (data: RoomDataType) => () => {
      if (data.check) {
        // checkRoomItem(data.id);
        setSelectedRooms((prev) => {
          const newData = prev.filter((room) => {
            return room.id !== data.id;
          });
          return [...newData];
        });
      } else {
        // checkRoomItem(data.id);
        setSelectedRooms((prev) => {
          return [...prev, data];
        });
      }
    },
    [roomList, selectedRooms],
  );

  // console.log(imageData);
  return (
    <Wrapper>
      <Background />
      <Container>
        <CloseBtn>
          <div onClick={onClickCloseModal}>
            <CgCloseO />
          </div>
        </CloseBtn>
        <ModalContainer>
          <ModalBox>
            <Modal currentStep={uploadStep}>
              <HeaderContainer>
                <ModalHeaderWrapper>
                  <ModalHeader>
                    <ModalTitle>
                      <h1>{headerName[uploadStep]}</h1>
                      {/* <h1>채널 선택</h1>
                      <h1>결과물</h1> */}
                    </ModalTitle>
                    {uploadStep !== 0 && (
                      <div className={'left_btn'} onClick={onClickPrevStep}>
                        <button>이전</button>
                      </div>
                    )}
                    <div className={'right_btn'} onClick={onClickNextStep}>
                      <button>다음</button>
                    </div>
                  </ModalHeader>
                </ModalHeaderWrapper>
              </HeaderContainer>
              <div className={'content_box'}>
                {uploadStep === 0 && (
                  <ModalImageBox onDrop={onDropData} onDragOver={onDragOver}>
                    <ImageDiv image={imageData}></ImageDiv>
                    <ImageCover />
                  </ModalImageBox>
                )}
                {uploadStep === 1 && (
                  <ChannelListBox>
                    <ul>
                      {roomList  && roomList.map((data: RoomDataType) => {
                        return (
                          <li onClick={inputRoom(data)} key={data.id}>
                            {data.check ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
                            <span>{data.title}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <div>
                      <p>현재 선택한 방들</p>
                      {selectedRooms.map((room) => {
                        return <span key={room.id}>{room.title}</span>;
                      })}
                    </div>
                  </ChannelListBox>
                )}
                {uploadStep === 2 && (
                  <div className={'result_box'}>
                    <ImageBox>
                      {/* <h2>업로드 사진</h2> */}
                      <ImageDiv
                        image={imageData}
                      ></ImageDiv>
                    </ImageBox>
                    <ListBox>
                      <div>
                        <h2>업로드할 채널목록</h2>
                        <ul>
                          {selectedRooms.map((room) => {
                            return <li key={room.id}>{room.title}</li>;
                          })}
                        </ul>
                      </div>
                    </ListBox>
                  </div>
                )}
              </div>
            </Modal>
          </ModalBox>
        </ModalContainer>
      </Container>
    </Wrapper>
  );
};

export default UploadModal;
