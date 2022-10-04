import React, { useState, useRef, useEffect, useMemo } from "react";
import useInfiniteLoad from "../hooks/useInfiniteLoad";

interface IProps {
  data: Array<number>;
  chunkSize: number;
}

export default function InfiniteLoadList({ data, chunkSize }: IProps) {
  const [dataToShow, target] = useInfiniteLoad(data, chunkSize);

  return (
    <div>
      <div>
        {dataToShow.map((item: number, index: number) => {
          return (
            <div className="list-item" key={item}>
              {item}
            </div>
          );
        })}
      </div>
      <div ref={target}></div>
    </div>
  );
}
