import { NextPageWithLayout } from "@layouts/Baseof";
import Sidebar from "@layouts/components/sidebar";
import { Button, Card, CustomFlowbiteTheme, Select, Tabs, Label, Modal, ModalProps } from "flowbite-react";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BiSolidDollarCircle,BiLogoBitcoin } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { TbCurrencySolana, TbCurrencyBitcoin,TbCurrencyEthereum } from "react-icons/tb";
import { CiBank } from "react-icons/ci";
import { TbCurrencyPeso } from "react-icons/tb";
import Image from "next/image";

interface Coin {
    name: string;
    icon: JSX.Element;
    value: string;
    rate: number;
}


const tabsTheme: CustomFlowbiteTheme["tabs"] = {
    tabitemcontainer: {
        base: "flex justify-center space-x-2 ",
    },
    tablist: {
        tabitem: {
            styles: {
                default: {
                    active: {
                        on: 'text-white bg-darkGreen',
                    },
                }
            },
            "base": "flex items-center focus:bg-darkGreen active:text-white bg-lightGreen  w-2/4 justify-center p-4 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-white disabled:dark:text-white focus:ring-0  focus:outline-none rounded-t-lg border-transparent hover:border-lightGreen text-white focus:text-white",
        },
    },
    tabpanel: 'bg-darkGreen text-white sm:p-8 p-4 w-full rounded-b-lg'
  };

const BuyPage: NextPageWithLayout = () => {
    return (
        <Card className="max-w-xl p-0" theme={{
            root: {
                children: 'p-0'
            }
        }}>
            <Tabs aria-label="Default tabs" className="p-0 justify-center border-b-0" style={'default'} theme={tabsTheme}>
                <Tabs.Item active={true} title="Buy" icon={HiUserCircle} className="text-white">
                    <CoinTransfer />
                </Tabs.Item>
                <Tabs.Item title="Sell (Comming Soon)" icon={MdDashboard} disabled/>
            </Tabs>
        </Card>
    );
}

const CoinTransfer = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openCoinDropdown, setOpenCoinDropdown] = useState(false)
    const [amountToBuy, setAmountToBuy] = useState<string>('')
    const [amountInMTR, setAmountInMTR] = useState<string>('')
    const [coinsAvailable, setCoinsAvailable] = useState<Coin[]>([
        {
            name: 'USD',
            icon: <BiSolidDollarCircle className="w-5 h-5 me-2.5 fill-orange "/>,
            value: 'usd',
            rate: 0.30
        },
        {
            name: 'COP',
            icon: <TbCurrencyPeso className="w-5 h-5 me-2.5 fill-lime-700"/>,
            value: 'cop',
            rate: 1165.75
        },
        {
            name: 'BTC',
            icon: <BiLogoBitcoin className="w-5 h-5 me-2.5 fill-orange"/>,
            value: 'btc',
            rate: 0.0000048
        }
    ])
    const [selectedCoin, setSelectedCoin] = useState<Coin>(coinsAvailable[0]) ;

    const toggleDropdown = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setOpenCoinDropdown(!openCoinDropdown)
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(e.target.value)
        setAmountToBuy(e.target.value)
        const mtrAmount = calculateMTR(Number(e.target.value))
        setAmountInMTR(mtrAmount)
    }

    const handleMTRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setAmountInMTR(e.target.value)
        const amountInCurrency = calculateAmount(Number(e.target.value))
        setAmountToBuy(amountInCurrency)
    }

    const handleCoinChange = (coin: Coin, e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSelectedCoin(coin)
        setOpenCoinDropdown(false)
    }

    const calculateMTR = (amountToBuy: number): string => {
        const mtrValue = selectedCoin.rate; // Value of 1 MTR in the currency selected
        const mtrAmount = amountToBuy / mtrValue;
        if (mtrAmount === 0) return '';
        return mtrAmount.toFixed(9);
    };

    const calculateAmount = (mtrAmount: number): string => {
        const mtrValue = selectedCoin.rate; // Value of 1 MTR in the currency selected
        const amount = mtrAmount * mtrValue;
        if (amount === 0) return '';
        return amount.toFixed(2);
    };

    return (
            
    <div>

        <form className="w-full mx-auto ">
            <div className="space-x-0 space-y-4 rtl:space-x-reverse flex items-center flex-col mb-4">
                <div className="flex relative sm:h-16 sm:w-2/3">
                    <div className="relative w-full sm:h-full">
                        <input type="number" onChange={handleAmountChange} value={amountToBuy} id="fiat-currency-input" className="block p-2.5 sm:h-full w-full z-20 text-sm sm:text-xl text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Enter amount" />
                    </div>
                    <button id="dropdown-fiat-currency-button" type="button" onClick={(e) => toggleDropdown(e as any)}  className="flex-shrink-0  z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200  dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" >
                        {selectedCoin?.icon}
                        <p className="hidden sm:block">{selectedCoin?.name}</p>
                        <MdKeyboardArrowDown className="w-5 h-5 ms-2.5 hidden sm:block"/>
                    </button>
                    <div id="dropdown-fiat-currency" className={`${openCoinDropdown ? '' : 'hidden'}  z-10 absolute left-full -translate-x-[92%] top-16  bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-fiat-currency-button">
                            {
                                coinsAvailable.map((coin, index) => (
                                    <li key={index}>
                                        <button onClick={(e) => handleCoinChange(coin, e as any ) } className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" >
                                            <div className="inline-flex items-center">
                                                {coin.icon}
                                                {coin.name}
                                            </div>
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <button type="button" disabled className="p-3 text-sm font-medium text-gray-500 focus:outline-none bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <FaArrowDown/>
                    <span className="sr-only">Convert currency</span>
                </button>
                <div className="flex sm:h-16 sm:w-2/3">
                    <div className="relative w-full sm:h-full">
                        <input type="number" value={amountInMTR} onChange={handleMTRChange}  id="crypto-input" className="block p-2.5 sm:h-full w-full z-20 text-sm sm:text-xl text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="0.323 MTR" required />
                    </div>
                    <button id="dropdown-crypto-button" className="flex-shrink-0 z-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                        <Image src="/images/Metri.png" alt="metri" width={20} height={20} className="me-2.5"/>
                        <p className="hidden sm:block">METRI</p> 
                    </button>
                </div>
            </div>
            {/* <div className="flex justify-between items-center flex-col sm:flex-row space-y-2 sm:space-y-0">
                <p className="text-sm text-gray-500 dark:text-gray-400">Last update: 20:45 AM, November 20, 2023</p>
                <button type="reset" className="text-sm text-blue-700 dark:text-blue-500 inline-flex items-center font-medium hover:underline" disabled>
                    Refresh <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                    </svg>
                </button>
            </div> */}
        </form>
        <div className=" space-x-0  rtl:space-x-reverse flex items-center flex-col mb-4 mt-20">
            <button onClick={() => setOpenModal(true)} className=" text-gray-50  duration-300 relative group cursor-pointer   overflow-hidden h-16 w-48 rounded-md bg-lightGreen opacity-90 p-2  font-extrabold hover:bg-orange">
                <div className="absolute justify-center items-center flex group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-12 top-12 bg-[#268f8f] opacity-40">
                    <CiBank/>
                </div>
                <div className="absolute  group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-20 -top-6 bg-orange-500">
                </div>
                <div className="absolute justify-center items-center flex group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8   rounded-full group-hover:scale-150  duration-700 right-32 top-1 bg-[#268f8f] opacity-70">
                    <TbCurrencySolana/>
                </div>
                <div className="absolute justify-center items-center flex group-hover:-top-1 group-hover:-right-2 z-10 w-5 h-5   rounded-full group-hover:scale-150  duration-700 right-2 top-12 bg-[#268f8f] ">
                    <TbCurrencyBitcoin/>
                </div>
                <p className="z-10 absolute bottom-2 left-2" >Buy Metri</p>
            </button>
        </div>
        <BuyModal openModal={openModal} setOpenModal={setOpenModal}/>
    </div>


    )
} 

const BuyModal: React.FC<{openModal: boolean, setOpenModal: Dispatch<SetStateAction<boolean>>}> = ({openModal, setOpenModal}) => {
    enum typeOfPaymentEnum {
        BANK = 'bank',
        BTC = 'btc',
        SOL = 'sol',
        ETH = 'eth'
    }
    const [modalPlacement, setModalPlacement] = useState<ModalProps['position']>('center')
    const [typeOfPayment, setTypeOfPayment] = useState<typeOfPaymentEnum | undefined>()

    const handlePaymentType = (type: typeOfPaymentEnum) => {
        setTypeOfPayment(type)
    }

    return (
        <Modal
        show={openModal}
        position={modalPlacement}
        size={'md'}
        theme={{
            root: {
                show: {
                    on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
                }
            }
        }}
        onClose={() => setOpenModal(false)}
    >
        <Modal.Header>
          <h2 className="text-lg font-semibold">Buy Metri</h2>
        </Modal.Header>
        <Modal.Body>
        <div className="flex flex-col justify-start gap-6">
            <div>
                <p>Fiat payment</p>
                <button onClick={() => handlePaymentType(typeOfPaymentEnum.BANK)} className="flex w-full  justify-start items-center gap-4 px-[16px] rounded-[10px] relative border hover:border-lightGreen focus:border-lightGreen border-solid cursor-pointer py-[12px] h-[76px] mt-[12px]">
                    <CiBank className="w-8 h-8"/>
                    Bank Transfer
                </button>
            </div>
            <div >
                <p>Crypto Payment</p>
                <button  onClick={() => handlePaymentType(typeOfPaymentEnum.BTC)} className="flex w-full  justify-start items-center gap-4 px-[16px] rounded-[10px] relative border hover:border-lightGreen focus:border-lightGreen border-solid cursor-pointer py-[12px] h-[76px] mt-[12px]">
                    <TbCurrencyBitcoin className="w-8 h-8"/>
                    Bitcoin
                </button>
                <button onClick={() => handlePaymentType(typeOfPaymentEnum.SOL)} className="flex w-full  justify-start items-center gap-4 px-[16px] rounded-[10px] relative border hover:border-lightGreen focus:border-lightGreen border-solid cursor-pointer py-[12px] h-[76px] mt-[12px]">
                    <TbCurrencySolana className="w-8 h-8"/>
                    Solana
                </button>
                <button onClick={() => handlePaymentType(typeOfPaymentEnum.ETH)} className="flex w-full  justify-start items-center gap-4 px-[16px] rounded-[10px] relative border hover:border-lightGreen focus:border-lightGreen border-solid cursor-pointer py-[12px] h-[76px] mt-[12px]">
                    <TbCurrencyEthereum className="w-8 h-8"/>
                    Ethereum
                </button>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="text-base bg-orange w-full items-center appearance-none border-b-gray-800 rounded-bl-lg rounded-br-lg border-l-gray-800 border-l-0 border-r-gray-800 border-r-0 border-t-gray-800 rounded-tl-lg rounded-tr-lg box-border text-gray-800 space-x-1.5 cursor-pointer flex text-base font-medium h-12 justify-center leading-6 mb-0 ml-0 mr-0 mt-0 min-h-12 min-w-20 outline-none overflow-x-hidden overflow-y-hidden pb-0 pl-4 pr-4 pt-0 space-y-1.5 text-center no-underline overflow-ellipsis whitespace-nowrap select-none break-all">
            Confirm
          </button>
        </Modal.Footer>
    </Modal>
    )
}

BuyPage.getLayout = (page) => {
    return (
        <Sidebar>
            {page}
        </Sidebar>
    )
}

export default BuyPage;