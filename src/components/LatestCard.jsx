import React from "react";
import { timeAgo, truncate } from "../utils";
import { useAppState } from "../context/globalStates";

function LatestCard({ data }) {
  const {setSelectedArticle} = useAppState()
  return (
    <div onClick={()=>{setSelectedArticle(data)}} className="flex flex-col min-w-[200px] h-[200px] lg:h-[270px] lg:min-w-[300px] cursor-pointer">
      <img
        src={data.urlToImage}
        alt=""
        className="w-full rounded-lg h-[65%] object-cover"
      />
      <div className="flex justify-between  uppercase text-gray-400 text-[0.5rem] lg:text-sm my-2">
        <p>{data.source.name}</p>
        <p className="lg:pr-2">{timeAgo(data.publishedAt)}</p>
      </div>
      <p className="text-[0.5rem] lg:text-sm">{truncate(data.title)}</p>
    </div>
  );
}

export default LatestCard;
