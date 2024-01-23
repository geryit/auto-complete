import React, { memo, useMemo } from "react";
import ResultInner from "./ResultInner";

type Props = {
  result: string;
  query: string;
};

const Result = ({ result, query }: Props) => {
  // Example: query = "nited", parts =  ['U', 'nited', ' Kingdom']
  const parts = useMemo(
    () => result.split(new RegExp(`(${query})`, "gi")),
    [result, query],
  );
  return parts.map((part, i) => (
    <ResultInner key={i} part={part} query={query} />
  ));
};

export default memo(Result);
