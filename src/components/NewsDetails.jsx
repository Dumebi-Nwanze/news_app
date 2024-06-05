import React from "react";
import { useAppState } from "../context/globalStates";
import { truncate } from "../utils";

function NewsDetails() {
  const { setSelectedArticle, selectedArticle } = useAppState();

  return (
    <div
      className={`z-50 w-screen h-screen overflow-y-auto bg-slate-900 flex flex-col fixed top-0 transition-all duration-500 ease-in-out ${
        selectedArticle ? "left-0" : "-left-[100vw]"
      }`}
    >
      <div className="fixed w-full bg-inherit py-8 px-4">
        <button className="outline-none"
          onClick={() => {
            setSelectedArticle(null);
          }}
        >
          <img src="./left-arrow.png" alt="arrow back" className="h-6 w-6" />
        </button>
      </div>
      <div className="mt-28 flex-1  w-full">
        {selectedArticle && (
          <div className="flex flex-col lg:flex-row h-full px-4 lg:px-20 gap-x-10">
            <div className=" lg:h-[50%] lg:w-[50%]">
            <img src={selectedArticle.urlToImage} alt={selectedArticle.title} className="w-full h-full mb-4 object-cover" />    
            </div>
            <div className="flex-1 flex flex-col flex-wrap my-10 xl:my-0">
            <h1 className="text-3xl font-bold mb-10">{selectedArticle.title}</h1>
            <p>{truncate(selectedArticle.content, 199)} {selectedArticle.url&&<a className="underline text-blue-500 hover:text-blue-300" href={selectedArticle.url} target="_blank">Read more</a>}</p>    
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsDetails;
