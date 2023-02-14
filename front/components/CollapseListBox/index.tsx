import { Button } from '@styles/Button';
import autosize from 'autosize';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Container, DataCheckInput, DataLabel } from './styles';

interface Props {
  data?: { id: number; data: string }[];
  currentDataId?: number | string;
  nameKey: string;
  readOnly?: boolean;
  dataClickCallBack?: (roomId: number) => void;
  onClickDeleteMember?: (memberId: number) => () => void;
}

const CollapseListBox = ({
  data,
  nameKey,
  currentDataId,
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

  return (
    <Container>
      {data ? (
        data.map((item) => {
          return (
            <div key={item.id}>
              <div className="check_label_box" style={preventClickCSS}>
                <DataCheckInput
                  type="radio"
                  id={`${item.id}`}
                  name={`radio-group-${nameKey}`}
                  defaultChecked={'' + currentDataId === '' + item.id}
                />
                <DataLabel
                  htmlFor={`${item.id}`}
                  onClick={onClickDataLabel(item.id)}
                >
                  {item.data}
                </DataLabel>
              </div>
              {nameKey === 'member' && onClickDeleteMember && (
                <Button onClick={onClickDeleteMember(item.id)}>X</Button>
              )}
            </div>
          );
        })
      ) : (
        <div>로딩중...</div>
      )}
    </Container>
  );
};

export default memo(CollapseListBox);
