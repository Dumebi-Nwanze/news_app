import React, { useRef, useState, useCallback, useEffect } from "react";
import HeadlineCard from "./HeadlineCard";
import { getData } from "../utils";

const PAGE_SIZE = 10;

function NewsFeed({ selected }) {
  const target = useRef(null);
  const [feed, setFeed] = useState([]);
  const [isFeedLoading, setIsFeedLoading] = useState(true);
  const [page, setPage] = useState(1)

  const getFeed = async (pageNum) => {
    if (!isFeedLoading) {
      setIsFeedLoading(true);
    }
    const feedUrl = `https://newsapi.org/v2/everything?q=${
      selected.slug
    }&searchIn=title&apiKey=${
      import.meta.env.VITE_API_KEY
    }&pageSize=${PAGE_SIZE}&page=${pageNum}`;
    console.log(feedUrl);
    const data = await getData(feedUrl);
    if (data) {
      const articles = data.articles;
      setFeed((prev) => [
        ...prev,
        ...articles.filter((item) => item.urlToImage !== null),
      ]);
      if(feed.length<data.totalResults){
        console.log("Increment");
        setPage(prev=>prev+1)
      }
      
    }
    setIsFeedLoading(false);
  }
  useEffect(() => {
    getFeed(page);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
        //   getFeed(page);
        }
      },
      { threshold: 1 }
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target]);
  return (
    <div className="flex-1 flex flex-col xl:max-w-[70%] items-center ">
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 px-4 mb-4">
        {feed
          .filter((item) => item.urlToImage !== null)
          .map((itm, idx) => (
            <HeadlineCard key={idx} data={itm} />
          ))}
      </div>
      <div ref={target}></div>
      {isFeedLoading && (
        <div className="mb-4">
          {feed.length == 0 ? "Loading" : "Loading more..."}
        </div>
      )}
    </div>
  );
}

export default NewsFeed;
