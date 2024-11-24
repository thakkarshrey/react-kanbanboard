import * as React from "react"
import './DropIndicator.scss';

type Props = {
  beforeId: number;
  columnId: string;
};

function DropIndicator({ beforeId, columnId }: Props) {
  return (
    <div
      className="drop-area-card"
      data-before={beforeId}
      data-column={columnId}
    />
  );
};

export default DropIndicator;
