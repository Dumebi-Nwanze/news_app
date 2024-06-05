import React from 'react'
import { timeAgo, truncate } from '../utils'
import { useAppState } from '../context/globalStates'

function HeadlineCard({data}) {
  const {setSelectedArticle} = useAppState()
  return (
    <div onClick={()=>{setSelectedArticle(data)}} className="flex flex-col w-full h-[300px] lg:h-[270px]  bg-slate-800 p-4 rounded-lg cursor-pointer">
    <img
      src={data.urlToImage}
      alt=""
      className="w-full rounded-lg h-[55%] object-cover"
    />
    <div className="flex justify-between uppercase text-gray-400 text-[8px] lg:text-xs my-2">
      <p>{data.source.name}</p>
      <p>{timeAgo(data.publishedAt)}</p>
    </div>
    <p className="text-xs">{truncate(data.title)}</p>
  </div>
  )
}

export default HeadlineCard