import React from 'react'
import { BiSolidDollarCircle } from "react-icons/bi";


interface watchComponentProps {
    user: any;
}

const watchComponent: React.FC<watchComponentProps> = ({user})  => {
    return (
        <div className="mx-auto md:mx-0 group before:absolute before:bg-[#333] before:w-3 before:h-12 before:top-24 before:-right-2 before:-z-10 before:rounded-2xl before:shadow-inner before:shadow-gray-50 relative w-60 h-60 bg-[#0AA8A7] shadow-inner shadow-gray-50 flex justify-center items-center rounded-3xl">
            <div className="w-56 h-56 bg-[#033434] shadow-inner shadow-gray-50 flex justify-center items-center rounded-3xl">
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#212121] shadow-inner shadow-gray-50 w-52 h-52">
                <div className="group-hover:duration-300 hover:opacity-100  opacity-0 before:absolute before:w-12 before:h-12 before:bg-[#0AA8A7] before:rounded-full before:blur-xl before:top-16 relative   flex flex-col justify-around items-center w-44 h-40 bg-[#212121] text-gray-50">
                    <span className="font-bold text-sm" >Miguel</span>
                    <span className="z-10 flex items-center text-3xl text-[#fff] ">0.000000</span>
                    <div className="text-gray-50 w-48 flex flex-row justify-evenly">
                    <span className="text-xs font-bold">=10 usd</span>
                    <div className="flex flex-row items-center">
                        <BiSolidDollarCircle  className="w-6 h-6 fill-[#feac3f] animate-bounce "  preserveAspectRatio="xMidYMid meet" />
                    </div>
                    </div>
                </div>
                <span className="text-gray-700 text-lg font-light">Metri Data</span>
                </div>
            </div>
        </div>
    )
}

export default watchComponent