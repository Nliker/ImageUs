import { Button } from '@styles/Button';
import autosize from 'autosize';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Container, DataCheckInput, DataLabel } from './styles';

interface Props {
  data: { id: number; data: string }[];
  currentLoginId?: number | string;
  boxInfo: { boxName: string; hostId?: number };
  readOnly?: boolean;
  dataClickCallBack?: (roomId: number) => void;
  onClickDeleteMember?: (memberId: number) => () => void;
}

const CollapseListBox = ({
  data,
  boxInfo,
  currentLoginId,
  readOnly,
  dataClickCallBack,
  onClickDeleteMember,
}: Props) => {
  const preventClickCSS = {
    pointerEvents: readOnly
      ? ('none' as React.CSSProperties['pointerEvents'])
      : ('auto' as React.CSSProperties['pointerEvents']),
  };

  const onClickDataLabel = useCallback(
    (id: number) => () => {
      if (dataClickCallBack) dataClickCallBack(id);
    },
    [data],
  );

  const labelMarginCSS = {
    marginLeft: '60px',
  };

  return (
    <Container>
      {data.map((item) => {
        return (
          <div key={item.id} className="check_box">
            <div className="check_label_box" style={preventClickCSS}>
              <DataCheckInput
                type="radio"
                id={`${item.id}`}
                name={`radio-group-${boxInfo.boxName}`}
                defaultChecked={'' + currentLoginId === '' + item.id}
                boxName={boxInfo.boxName}
              />

              <DataLabel
                htmlFor={`${item.id}`}
                onClick={onClickDataLabel(item.id)}
              >
                <div className="mark_box">
                  {boxInfo?.hostId === item.id && (
                    <span className="room_manager_mark">방장</span>
                  )}
                  {currentLoginId === item.id && (
                    <span className="onself_mark">나</span>
                  )}
                </div>
                <span
                  className="item_text"
                  style={
                    boxInfo?.hostId === item.id || currentLoginId === item.id
                      ? labelMarginCSS
                      : undefined
                  }
                >
                  {item.data}
                </span>
              </DataLabel>
            </div>
            {boxInfo.boxName === 'member' &&
              boxInfo.hostId === currentLoginId &&
              boxInfo?.hostId !== item.id &&
              onClickDeleteMember && (
                <Button
                  className="error"
                  onClick={onClickDeleteMember(item.id)}
                >
                  강퇴
                </Button>
              )}
          </div>
        );
      })}
    </Container>
  );
};

export default memo(CollapseListBox);
