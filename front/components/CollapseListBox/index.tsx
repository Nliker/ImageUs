import autosize from 'autosize';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Container, DataCheckInput, DataLabel } from './styles';

interface Props {
  data: { id: number; data: string }[];
  currentDataId?: number | string;
  nameKey: string;
  readOnly?: boolean;
  dataClickCallBack?: (roomId: number) => void;
}

const CollapseListBox = ({
  data,
  nameKey,
  currentDataId,
  readOnly,
  dataClickCallBack,
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
    <Container style={preventClickCSS}>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <div className="check_label_box">
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
          </div>
        );
      })}
    </Container>
  );
};

export default memo(CollapseListBox);
