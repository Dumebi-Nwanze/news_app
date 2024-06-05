import React from 'react'
import LatestCard from './LatestCard'
import { useAppState } from '../context/globalStates'

function BreakingNews() {
const {latest}=useAppState()

  return (
    <div className="px-4">
    <div className="px-4 py-4 xl:px-12 xl:py-8 bg-slate-800 rounded-2xl flex flex-col space-y-4  w-full">
      <div className="flex justify-between items-center text-lg xl:mb-4">
        <p className="font-bold text-xs xl:text-base">What's New?</p>
        <p className="uppercase text-gray-400 text-xs xl:text-base">
          Latest news
        </p>
      </div>
      <div className=" flex justify-between overflow-x-scroll overflow-y-hidden hide-scrollbar gap-x-4 xl:gap-x-10 w-full">
        {latest
          
          .map((itm, idx) => (
            <LatestCard key={idx} data={itm} />
          ))}
      </div>
    </div>
  </div>
  )
}

export default BreakingNews