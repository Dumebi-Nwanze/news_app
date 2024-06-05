import React from 'react'
import { footerItems, socialIcons } from '../data'

function Footer() {
  return (
    <footer className="h-[10%] xl:h-[45%] md:w-[20%] xl:w-[30%] w-full flex flex-col gap-y-5 xl:gap-y-10 mb-4 xl:sticky xl:bottom-0 xl:right-0 ">
    <div className="flex flex-wrap justify-center md:justify-start xl:flex-wrap xl:gap-x-10 xl:gap-y-5 gap-x-4 gap-y-2 text-[0.5rem] xl:text-sm">
      {footerItems.map((item, _idx) => (
        <p key={item} className="text-gray-400">
          {item}
        </p>
      ))}
    </div>
    <div className="flex space-x-5 justify-center md:justify-start">
      {socialIcons.map((icon, _idx) => (
        <img
          key={icon}
          src={icon}
          alt={icon}
          className="xl:h-6 xl:w-6 h-2 w-2 cursor-pointer"
        />
      ))}
    </div>
  </footer>
  )
}

export default Footer