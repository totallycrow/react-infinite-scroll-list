import React, { useEffect, useMemo, useRef, useState } from "react";

export default function useInfiniteLoad(data: any, chunkSize: any) {
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState(data);

  const numberOfItemsToShow = page * chunkSize;
  const MAX_PAGES = Math.ceil(data.length / chunkSize);

  const target = useRef(null);

  //   HANDLE OBSERVER
  useEffect(() => {
    if (!target.current) return;
    const observer = new IntersectionObserver(loadMore, { threshold: 1 });
    observer.observe(target.current);

    return () => {
      if (target.current) observer.unobserve(target.current);
    };
  }, [target]);

  //   HANDLE UNLIMITED ADDITIONAL GENERATION
  useEffect(() => {
    if (page >= MAX_PAGES) {
      const moreData = Array.from(Array(100).keys());
      setListData((prev: any) => [...prev, ...moreData]);
    }
  }, [page, MAX_PAGES]);

  //   SET DATA TO SHOW
  const dataToShow = useMemo(() => {
    return listData.slice(0, numberOfItemsToShow);
  }, [listData, numberOfItemsToShow]);

  const loadMore = (entries: any) => {
    const entry = entries[0];
    if (entry.isIntersecting) setPage((prev) => prev + 1);
  };

  return [dataToShow, target];
}
