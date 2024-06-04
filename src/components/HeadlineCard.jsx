import React from 'react'
import { timeAgo, truncate } from '../utils'

function HeadlineCard({data}) {
  return (
    <div className="flex flex-col min-w-[200px] h-[300px] lg:h-[270px] lg:min-w-[230px] bg-slate-800 p-4 rounded-lg cursor-pointer">
    <img
      src={data.urlToImage}
      alt=""
      className="w-full rounded-lg h-[55%] object-cover"
    />
    <div className="flex justify-between uppercase text-gray-400 text-xs my-2">
      <p>{data.source.name}</p>
      <p>{timeAgo(data.publishedAt)}</p>
    </div>
    <p className="text-sm xl:text-xs">{truncate(data.title)}</p>
  </div>
  )
}

export default HeadlineCard