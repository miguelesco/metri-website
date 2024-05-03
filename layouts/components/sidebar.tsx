import { useEffect, useState } from "react"
import { Sidebar } from 'flowbite-react';
import config from "@config/config.json";
import { FaDollarSign } from "react-icons/fa";
import { HiArrowSmRight, HiCalendar, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards,  } from 'react-icons/hi';
import router from "next/router";
import React from "react";
import Image from "next/image";

export default function SidebarComponent({ children }: { children: React.ReactNode }) {

    const [menuOpen, setMenuOpen] = useState(false)
    const [menu1, setMenu1] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
      e.preventDefault()
      router.push(href)
    }

    const showNav = (show: boolean) => {
      setMenuOpen(show);
    }

    const [menuItems, setMenuItems] = useState<{ title: string, url: string, icon: React.FC<React.SVGProps<SVGSVGElement>> }[]>([
      { title: "Dashboard", url: '/dashboard', icon: HiChartPie },
      { title: "Buy Metri", url: 'dashboard/buy', icon: FaDollarSign },
    ]);

    const [menuDropdownItems, setMenuDropdownItems] = useState<{ title: string, open: boolean, elements: {title: string, url: string, icon: React.FC<React.SVGProps<SVGSVGElement>> | undefined }[] }[]>([
      { title: "Profile Overview", open:true, elements: [{title: "Messages", url: '/messages', icon: HiCalendar}, ] },
      // Add more menu items here
    ]);

      useEffect(() => {
           console.log(menuOpen)
      }, [menuOpen])

      const { title, logo } = config.site;

   return (
      <div >
         
         <button onClick={() => setMenuOpen((value) => !value)} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>

         <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
            <div className="h-full">
            
            <div className="rounded-r bg-gray-900 xl:hidden flex justify-between w-full p-6 items-center ">
              <div className="flex justify-between  items-center space-x-3">
                <Image src={logo} alt="logo" width={40} height={40} />
                <p className="text-2xl leading-6 text-white">{title}</p>
              </div>
              <div aria-label="toggler" className="flex justify-center items-center">
                <button aria-label="open" id="open" onClick={() => showNav(true)} className="hidden focus:outline-none focus:ring-2">
                  <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 18H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button aria-label="close" id="close" onClick={() => showNav(false)} className=" focus:outline-none focus:ring-2">
                  <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 6L18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
            <div id="Main" className={`xl:rounded-r transform  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-[#033434] flex-col ${ menuOpen ? 'xl:translate-x-64' : 'xl:translate-x-0'}`}>

              <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
                <Image src={logo} alt="logo" width={30} height={30} />
                <p className="text-2xl leading-6 text-white">{title}</p>
              </div>
              <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 ">
                {
                  menuItems.map((item, index) => (
                    <button key={index} onClick={(e) => handleClick(e, item.url)} className="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded ">
                      {item.icon && <item.icon className={`fill-stroke w-6 h-6`} />}
                      <p className="text-base leading-4 ">{item.title}</p>
                    </button>
                  ))
                }
              </div>
              {
                menuDropdownItems.map((item, index) => (
                  <div key={index} className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
                    <button onClick={() => setMenuDropdownItems((items) => items.map((item, i) => i === index ? { ...item, open: !item.open } : item))} className="focus:outline-none focus:text-indigo-400 text-left  text-white flex justify-between items-center w-full py-5 space-x-14  ">
                      <p className="text-sm leading-5  uppercase">{item.title}</p>
                      <svg id="icon1" className={`transform ${item.open ? '' : 'rotate-180'} `} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div id="menu1" className={`flex justify-start  flex-col w-full md:w-auto items-start pb-1 ${item.open ? 'translate-y-0' : 'hidden translate-y-1'} `}>
                      {
                        item.elements.map((element, index) => (
                          <button key={index} onClick={(e) => handleClick(e, element.url)} className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                            {element.icon && <element.icon className={`fill-stroke `} />}
                            <p className="text-base leading-4  ">{element.title}</p>
                          </button>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
         </aside>

         <div className=" sm:ml-64 mt-5" onClick={() => setMenuOpen(false)}>
            {children}
         </div>

      </div>
   )
}
