import React from 'react'
import { useAppState } from '../context/globalStates'
import HeadlineCard from './HeadlineCard'

function SearchResults() {
    const {searchResults, searchResultsRef} = useAppState()
  return (
    searchResults.length === 0 ? (
      <div className="p-4 flex-1 min-h-screen flex flex-col items-center justify-center">
        <p>No results</p>
      </div>
    ) : (
      <div
        ref={searchResultsRef}
        className="p-4 flex-1 min-h-screen pt-36 xl:pt-24 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10"
      >
        {searchResults.map((itm, idx) => (
          <HeadlineCard key={idx} data={itm} />
        ))}
      </div>
    )
  )
}

export default SearchResults