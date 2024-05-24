import { ICurrentUser } from '@lib/utils/API/interfaces';
import React from 'react'
import { BiSolidDollarCircle } from "react-icons/bi";


interface watchComponentProps {
    userData: ICurrentUser | undefined;
    exchangeRate: number;
}

const watchComponent: React.FC<watchComponentProps> = ({userData, exchangeRate})  => {
    
    return (
        <div className="mx-auto md:mx-0 group before:absolute before:bg-[#333] before:w-3 before:h-12 before:top-24 before:-right-2 before:-z-10 before:rounded-2xl before:shadow-inner before:shadow-gray-50 relative w-60 h-60 bg-[#0AA8A7] shadow-inner shadow-gray-50 flex justify-center items-center rounded-3xl">
            <div className="w-56 h-56 bg-[#033434] shadow-inner shadow-gray-50 flex justify-center items-center rounded-3xl">
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#212121] shadow-inner shadow-gray-50 w-52 h-52">
                    <div className="group-hover:duration-300 hover:opacity-100  opacity-0 before:absolute before:w-12 before:h-12 before:bg-[#0AA8A7] before:rounded-full before:blur-xl before:top-16 relative   flex flex-col justify-around items-center w-44 h-40 bg-[#212121] text-gray-50">
                        { userData ? (<>
                            <span className="font-bold text-sm" >{userData.user.email}</span>
                            <span className="z-10 flex items-center text-3xl text-[#fff] justify-center">{userData.balance} <span className='text-xs ml-2'>MTR</span></span>
                            <div className="text-gray-50 w-48 flex flex-row justify-evenly">
                            <span className="text-x</div>s font-bold">={(Math.max(exchangeRate * userData.balance)).toFixed(2)} usd</span>
                            <div className="flex flex-row items-center">
                                <BiSolidDollarCircle  className="w-6 h-6 fill-[#feac3f] animate-bounce "  preserveAspectRatio="xMidYMid meet" />
                            </div>
                            </div>
                            </>) : (
                                loadingWatch()
                            )
                        }
                    </div>
                    <span className="text-gray-700 text-lg font-light">Metri Data</span>
                    </div>
                </div>
            </div>
        )
}

const loadingWatch = () => {
    return (
        <div
        className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(#333_0deg,#333_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]"
        >
        <span
            className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"
        >
        </span>
</div>

    )
}

export default watchComponent