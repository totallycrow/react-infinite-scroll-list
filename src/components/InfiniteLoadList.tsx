import React, { useState, useRef, useEffect, useMemo } from "react";

export default function InfiniteLoadList({ data, chunkSize }: any) {
  const [page, setPage] = useState(1);

  console.log("PAGE", page);

  const numberOfItemsToShow = page * chunkSize;
  const dataToShow = useMemo(() => data.slice(0, numberOfItemsToShow), [page]);

  console.log("DATA TO SHOW", dataToShow);

  const target = useRef(null);

  const loadMore = (entries: any) => {
    const entry = entries[0];
    if (entry.isIntersecting) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!target.current) return;
    const observer = new IntersectionObserver(loadMore, { threshold: 1 });
    observer.observe(target.current);

    return () => {
      if (target.current) observer.unobserve(target.current);
    };
  }, [target]);

  return (
    <div>
      <div>
        {" "}
        {dataToShow.map((item: any, index: any) => {
          if (index === numberOfItemsToShow - 1) {
            return <div className="last">{item}</div>;
          } else return <div className="regular-item">{item}</div>;
        })}
      </div>
      <div ref={target}></div>
    </div>
  );
}
