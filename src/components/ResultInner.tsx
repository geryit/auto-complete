import React, { memo, useMemo } from "react";

type Props = {
  part: string;
  query: string;
};

const ResultInner = ({ part, query }: Props) => {
  const isBold = useMemo(
    () => part.toLowerCase() === query.toLowerCase(),
    [part, query],
  );
  return isBold ? <strong>{part}</strong> : <span>{part}</span>;
};

export default memo(ResultInner);
