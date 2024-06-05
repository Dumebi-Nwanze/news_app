import React, { useRef, useState, useCallback, useEffect } from "react";
import HeadlineCard from "./HeadlineCard";
import { getData } from "../utils";
import { useAppState } from "../context/globalStates";

const PAGE_SIZE = 10;//number of elements to fetch per request

function NewsFeed() {
  const target = useRef(null);// reference to div at the end of list
  const [feed, setFeed] = useState([]);
  const [isFeedLoading, setIsFeedLoading] = useState(true);
  const { selected } = useAppState()
  let page = 1 //starting page number at one

  //Function to get the news feed based on selected category in the nav
  const getFeed = async (pageNum) => {
    if (!isFeedLoading) {
      setIsFeedLoading(true);
    }
    const feedUrl = `https://newsapi.org/v2/everything?q=${
      selected.slug
    }&searchIn=title&apiKey=${
      import.meta.env.VITE_API_KEY
    }&pageSize=${PAGE_SIZE}&page=${pageNum}`;
    
    const data = await getData(feedUrl);//get data function defined runs a fetch request
    if (data) {
      const articles = data.articles;
      setFeed((prev) => [
        ...prev,
        ...articles.filter((item) => item.urlToImage !== null),//filter all the results with missing image, usually there is a problem with the data
      ]);
      if (feed.length < data.totalResults) {// check if there is more results
        page++;//increment page for next request
      }
    }
    setIsFeedLoading(false);
  };
  useEffect(() => { // listens to see if div at the end of the list is in vies
    const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {//if div is in view, get more data with new page value
            getFeed(page);
          }
        },
        { threshold: 1 }
      );
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {// cleanup listener
        if (target.current) {
          observer.unobserve(target.current);
        }
      };
  }, [target]);

  return (
    <div className="flex-1 flex flex-col md:max-w-[60%] xl:max-w-[70%] items-center ">
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-4 mb-4">
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
