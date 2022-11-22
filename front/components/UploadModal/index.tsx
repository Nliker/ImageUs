import React, { useCallback, DragEvent, useState } from 'react';
import {
  Background,
  ChannelListBox,
  CloseBtn,
  Container,
  ContentBox,
  HeaderContainer,
  ImageCover,
  ImageDiv,
  Modal,
  ModalBox,
  ModalContainer,
  ModalHeader,
  ModalHeaderWrapper,
  ModalImageBox,
  ModalTitle,
  ResultBox,
  Wrapper,
} from './styles';
import { CgCloseO } from 'react-icons/cg';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';

/*
    백엔드 완성 시 채널에 키값을 id로 설정해주게 수정해야됨,
    선택된 항목의 아이콘 색 변경
    선택된 방의 다시 선택 못하게 변경
    체크 해제 할 때 channel명이 아니라 id로 고유한 값으로 필터링해야함
*/

interface Props {
  onCloseModal: (e: any) => void;
}

interface ChannelProps {
  id: number;
  name: string;
  check: boolean;
}

const dummyData = [
  {
    id: 1,
    name: '채널1',
    check: false,
  },
  {
    id: 2,
    name: '채널2',
    check: false,
  },
  {
    id: 3,
    name: '채널3',
    check: false,
  },
  {
    id: 4,
    name: '채널4',
    check: false,
  },
  {
    id: 5,
    name: '채널5',
    check: false,
  },
];

const UploadModal = ({ onCloseModal }: Props) => {
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);
  const [uploadStep, setUploadStep] = useState<number>(0);
  // 백에서 정보를 받아서 check 키값을 추가해서 channelList 객체로 만든다.
  const [channelList, setChannelList] = useState<Array<ChannelProps>>(dummyData);
  const [selectedChannels, setSelectedChannels] = useState<Array<string>>([]);

  const headerName = ['사진 업로드', '채널 선택', '결과물'];

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
  }, []);

  const onClickPrevStep = useCallback(() => {
    setUploadStep((prev) => {
      if (prev <= 0) {
        return 0;
      } else {
        return prev - 1;
      }
    });
  }, []);

  const onClickNextStep = useCallback(() => {
    setUploadStep((prev) => {
      if (prev >= 2) {
        return 2;
      } else {
        return prev + 1;
      }
    });
  }, []);

  console.log(channelList);
  const checkChannelItem = (id: number) => {
    const newChannelList = channelList.map((channelItem) => {
      if (channelItem.id === id) {
        // channelItem.check = !channelItem.check;
        // 불변성을 유지하기 위해서 아래처럼 새로운 변수에 값을 넣어서 리턴해야 한다.
        // 그렇지 않고 위와 같이 쓰면 원래 state의 값이 변경된다. 객체의 참초값을 쓰게 됨으로
        const newChannelItem = {...channelItem, check: !channelItem.check};
        return newChannelItem;
      }
      return channelItem;
    });
    setChannelList([...newChannelList]);
  };

  const inputChannel = useCallback(
    (data: ChannelProps) => () => {
      console.log(data, channelList);
      if (data.check) {
        checkChannelItem(data.id);
        setSelectedChannels((prev) => {
          // channel명이 아니라 id로 고유한 값으로 필터링해야함
          const newData = prev.filter((channel) => {
            return channel !== data.name;
          });
          console.log(newData);
          return [...newData];
        });
      } else {
        checkChannelItem(data.id);
        setSelectedChannels((prev) => {
          return [...prev, data?.name];
        });
      }
    },
    [channelList, selectedChannels],
  );

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
              <HeaderContainer>
                <ModalHeaderWrapper>
                  <ModalHeader>
                    <ModalTitle>
                      <h1>{headerName[uploadStep]}</h1>
                      {/* <h1>채널 선택</h1>
                      <h1>결과물</h1> */}
                    </ModalTitle>
                    {uploadStep !== 0 && (
                      <div className="left_btn" onClick={onClickPrevStep}>
                        <button>이전</button>
                      </div>
                    )}
                    <div className="right_btn" onClick={onClickNextStep}>
                      <button>다음</button>
                    </div>
                  </ModalHeader>
                </ModalHeaderWrapper>
              </HeaderContainer>
              <ContentBox>
                {uploadStep === 0 && (
                  <ModalImageBox onDrop={onDropData} onDragOver={onDragOver}>
                    <ImageDiv image={imageData}></ImageDiv>
                    <ImageCover />
                  </ModalImageBox>
                )}
                {uploadStep === 1 && (
                  <ChannelListBox>
                    <ul>
                      {channelList.map((data, i) => {
                        return (
                          <li onClick={inputChannel(data)} key={i + data.name}>
                            {data.check ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
                            <span>{data.name}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <div>
                      <p>현재 선택한 방들</p>
                      {selectedChannels.map((channel, i) => {
                        return <span key={i + channel}>{channel}</span>;
                      })}
                    </div>
                  </ChannelListBox>
                )}
                {uploadStep === 2 && <ResultBox></ResultBox>}
              </ContentBox>
            </Modal>
          </ModalBox>
        </ModalContainer>
      </Container>
    </Wrapper>
  );
};

export default UploadModal;
