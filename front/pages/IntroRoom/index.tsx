import { Button } from '@styles/Button';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Container, Wrapper } from './styles';
import { CameraImage } from '@assets/image';
import useModal from '@hooks/useModal';
import { useSidebar } from '@hooks/useSidebar';
import { IconContext } from 'react-icons';
import { AiOutlineMenuUnfold } from 'react-icons/ai';

function IntroRoom() {
  const { showCreateRoomModal } = useModal();
  const { leftBarState, setLeftbarState } = useSidebar();

  const handleCreateRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    showCreateRoomModal();
  };

  return (
    <Wrapper>
      <Scrollbars>
        {!leftBarState && (
          <div className="nav_icon" onClick={() => setLeftbarState(true)}>
            <IconContext.Provider
              value={{
                size: '30px',
                style: { color: 'rgba(0, 0, 0, 0.7)' },
              }}
            >
              <AiOutlineMenuUnfold />
            </IconContext.Provider>
          </div>
        )}
        <Container>
          <CameraImage style={{ width: '400px', height: 'auto' }} />
          <p className="text">
            {`왼쪽에서 방을 선택하시거나
아래 버튼을 눌러 방을 생성하세요!`}
          </p>
          <Button onClick={handleCreateRoom}>방 생성하기</Button>
        </Container>
      </Scrollbars>
    </Wrapper>
  );
}

export default IntroRoom;
