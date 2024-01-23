import React, { memo, useMemo } from "react";
import ResultInner from "./ResultInner";

type Props = {
  result: string;
  query: string;
};

const Result = ({ result, query }: Props) => {
  const parts = useMemo(() => result.split(new RegExp(`(${query})`, "gi")), []);
  return parts.map((part, i) => (
    <ResultInner key={i} part={part} query={query} />
  ));
};

export default memo(Result);
