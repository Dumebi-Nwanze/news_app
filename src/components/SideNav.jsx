import React from "react";
import { navItems } from "../data";
import { useAppState } from "../context/globalStates";

function SideNav() {
  const {selected, setSelected} = useAppState()
  return (
    <nav className="bg-black h-screen w-[15%]  flex-col px-10 hidden xl:flex sticky top-0">
      <div className="py-4  flex items-center justify-center w-full ">
        <div className="logo p-10">
          <div className="rectangle bg-[#007b83] top-10 left-[30px] z-[3]"></div>
          <div className="rectangle bg-[#2a52be] top-10 left-[60px] z-[2]"></div>
          <div className="rectangle bg-[#4b0082] top-10 left-[90px]"></div>
        </div>
        {/* <img src="/news_logo.png" alt="" /> */}
      </div>
      <div className="flex-1 flex flex-col mt-10">
        {navItems.map((itm, _idx) => (
          <div
            key={itm.slug}
            onClick={() => {
              setSelected(itm);
            }}
            className="flex-1 uppercase text-center cursor-pointer"
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
  );
}

export default SideNav;
