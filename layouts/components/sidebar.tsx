import { useEffect, useState } from "react"
import { Sidebar } from 'flowbite-react';
import config from "@config/config.json";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import router from "next/router";
import React from "react";

export default function SidebarComponent({ children }: { children: React.ReactNode }) {

    const [menuOpen, setMenuOpen] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
      e.preventDefault()
      router.push(href)
    }

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
            <Sidebar aria-label="Sidebar with logo branding example">
              <Sidebar.Logo href="#" img={logo} imgAlt="Metri logo">
                {title}
              </Sidebar.Logo>
              <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="#" icon={HiChartPie} >
                  <button onClick={(e) => handleClick(e, '/userDashboard')} >Dashboard</button>
                </Sidebar.Item>
                <Sidebar.Item href="/userDasboard/money" icon={HiChartPie}>
                  <button onClick={(e) => handleClick(e, '/userDashboard/money')} >Deposit / Withdrawal</button>
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiTable}>
                  Sign Out
                </Sidebar.Item>
              </Sidebar.ItemGroup>  
              </Sidebar.Items>
            </Sidebar>
         </aside>

         <div className="p-4 sm:ml-64 mt-5" onClick={() => setMenuOpen(false)}>
            {children}
         </div>

      </div>
   )
}
