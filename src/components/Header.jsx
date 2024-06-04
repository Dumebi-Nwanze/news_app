import React from "react";

import ArrowDown from "./ArrowDown";
import { navItems } from "../data";

function Header({ searchText, setSearchText, selected, setSelected, setPage, setFeed }) {
  return (
    <div className="">
      <nav className="bg-slate-800  xl:hidden flex flex-col  w-screen">
        <div className="flex justify-between items-center px-8 py-4 ">
          <div>
            <div className="hamburger">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <div className="h-5 w-5">
            <div className="logo p-10 w-full h-full">
              <div className="rectangle bg-[#007b83] top-[-10px] left-[-20px] z-[3]"></div>
              <div className="rectangle bg-[#2a52be] top-[-10px] left-[0px] z-[2]"></div>
              <div className="rectangle bg-[#4b0082] top-[-10px] left-[20px]"></div>
            </div>
          </div>
          <div  className="relative transition-all duration-300">
            <input
            placeholder="Search News"
              type="search"
              value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
              className="peer cursor-pointer relative z-10 h-8 w-8 rounded-full focus:border-2 bg-transparent pl-4 outline-none focus:w-full focus:cursor-text  focus:pl-10 focus:pr-4 placeholder:font-bold placeholder:text-xs text-xs"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent  px-3.5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
         
        </div>
        <div className=" h-[1px] bg-white"></div>
        <div className="flex whitespace-nowrap space-x-10 text-sm xl:text-lg p-4  overflow-x-scroll hide-scrollbar">
          {navItems.map((itm, _idx) => (
            <div
              key={itm.slug}
              onClick={() => {
                setSelected(itm);
              }}
              className=" uppercase  cursor-pointer"
            >
              <p
                className={
                  selected.slug === itm.slug ? "font-semibold" : "text-gray-400"
                }
              >
                {itm.title}
              </p>
            </div>
          ))}
        </div>
      </nav>
      <div className="hidden xl:flex justify-between items-center p-4">
        <div className=" border-2 border-gray-500 py-2 px-4 rounded-full flex space-x-4 ite">
          <img src="/search.png" alt="Search" className="h-6" />
          <input
          type="search"
            placeholder="Search News"
            className="outline-none border-none bg-transparent placeholder:font-bold font-medium"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>

        <div className="flex space-x-2 justify-center items-center pr-8">
          <div className="w-4 h-4">
            <ArrowDown />
          </div>
          <p className="text-xl font-medium">INT</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
