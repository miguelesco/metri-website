import { useState, useEffect, useCallback, SetStateAction, Dispatch } from "react";
import { NextPageWithLayout } from "@layouts/Baseof";
import axios from 'axios';
import Sidebar from "@layouts/components/sidebar";
import { Button, Card, CustomFlowbiteTheme, Select, Tabs, Label, Modal, ModalProps } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BiSolidDollarCircle,BiLogoBitcoin } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { TbCurrencySolana, TbCurrencyBitcoin,TbCurrencyEthereum, TbBrandBinance } from "react-icons/tb";
import { CiBank } from "react-icons/ci";
import { TbCurrencyPeso } from "react-icons/tb";
import Image from "next/image";
import { createPayment } from "@lib/utils/API/payment";
import { CreatePaymentParams } from "@lib/utils/interfaces";
import CopyToClipboard from "react-copy-to-clipboard";
import CryptoCard from "@layouts/components/CryptoCard";

interface Coin {
    name: string;
    icon: JSX.Element;
    value: string;
    rate: number;
}

interface CryptoPrice {
    initialPrices?: {
        binancecoin: {usd: number};
        bitcoin: {usd: number}
        ethereum: {usd: number}
    }
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
                        on: 'text-darkGreen bg-white',
                    },
                }
            },
            "base": "flex items-center focus:bg-gray-100 focus:bg-opacity-100 active:text-darkGreen bg-darkGreen disabled:bg-opacity-90 w-2/4 justify-center p-4 pb-6 pt-6 text-xl font-bold font-semibold first:ml-0 disabled:cursor-not-allowed disabled:text-white disabled:dark:text-white focus:ring-0  focus:outline-none rounded-t-lg border-transparent hover:border-lightGreen text-white focus:text-darkGreen",
        },
    },
    tabpanel: 'bg-white text-darkGreen sm:p-8 p-4 w-full rounded-b-lg '
  };


  
export async function getServerSideProps() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'bitcoin,binancecoin,ethereum',
          vs_currencies: 'usd'
        }
      });
      return {
        props: { initialPrices: response.data }
      };
    } catch (error) {
      console.error('Failed to fetch data', error);
      return { props: { initialPrices: {} } };
    }
  }
  

const BuyPage: NextPageWithLayout<CryptoPrice> = ({ initialPrices }) => {
    const [prices, setPrices] = useState<CryptoPrice['initialPrices']>(initialPrices);

    
const cryptos = [
    { name: 'BNB', price: '600.20', change: '-1.82%', icon: 'path/to/bnb-icon.png', changeColor: 'red-500' },
    { name: 'BTC', price: '67,999.99', change: '-3.20%', icon: 'path/to/btc-icon.png', changeColor: 'red-500' },
    { name: 'ETH', price: '3,841.00', change: '-2.58%', icon: 'path/to/eth-icon.png', changeColor: 'red-500' },
    { name: 'PEPE', price: '0.00001599', change: '-4.19%', icon: 'path/to/pepe-icon.png', changeColor: 'red-500' },
    { name: 'NOT', price: '0.009215', change: '+20.33%', icon: 'path/to/not-icon.png', changeColor: 'green-500' },
  ];

    return (
        <div className=" min-h-screen flex justify-evenly items-center flex-wrap gap-5">
            <div className=" rounded-lg sm:w-[500px] shadow border border-gray-200">
                <div className="bg-white border-b-2 border-darkGreen border-opacity-15 rounded-t-xl w-full p-8 mb-9">
                    <h1 className="text-6xl text-darkGreen ">Crypto Rate</h1>
                </div>
                <div className="bg-gray-50 m-10 mt-8 mb-8 rounded-lg p-4">
                    <h2 className=" text-lg mb-4">Hot Cryptos</h2>
                    {cryptos.map((crypto) => (
                        <CryptoCard
                            key={crypto.name}
                            name={crypto.name}
                            price={crypto.price}
                            change={crypto.change}
                            icon={crypto.icon}
                            changeColor={crypto.changeColor}
                        />
                    ))}
                </div>
            </div>
            <Card className="max-w-xl p-0 shadow " theme={{
                root: {
                    children: 'p-0 sm:w-[500px]'
                }
            }}>
                <Tabs aria-label="Default tabs" className="p-0 gap-0 justify-center border-b-0 " style={'default'} theme={tabsTheme}>
                    <Tabs.Item active={true} title="Buy" icon={HiUserCircle} className="text-white ">
                        <CoinTransfer setPrices={setPrices} prices={prices} />
                    </Tabs.Item>
                    <Tabs.Item title="Sell (Coming Soon)" icon={MdDashboard} disabled/>
                </Tabs>
            </Card>
            
        </div>
    );
}

interface CoinTransferProps {
    setPrices: (prices: CryptoPrice['initialPrices']) => void;
    prices: CryptoPrice['initialPrices'];
}

const CoinTransfer: React.FC<CoinTransferProps> = ({ setPrices, prices }) => {
    const [openModal, setOpenModal] = useState(false)
    const [openCoinDropdown, setOpenCoinDropdown] = useState(false)
    const [amountToBuy, setAmountToBuy] = useState<string>('')
    const [amountInMTR, setAmountInMTR] = useState<string>('')
    const [currentMTRPriceinUsd, setCurrentMTRPriceinUsd] = useState<number>(0.30);
    const [coinsAvailable, setCoinsAvailable] = useState<Coin[]>([
        {
            name: 'USD',
            icon: <BiSolidDollarCircle className="w-5 h-5 me-2.5 fill-orange "/>,
            value: 'usd',
            rate: currentMTRPriceinUsd
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
                <div className="flex relative sm:h-16 w-full">
                    <div className="relative w-full sm:h-full">
                        <input type="number" onChange={handleAmountChange} value={amountToBuy} id="fiat-currency-input" className="block p-2.5 sm:h-full w-full z-20 text-sm sm:text-2xl text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Enter amount" />
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
                <div className="flex sm:h-16 w-full">
                    <div className="relative w-full sm:h-full">
                        <input type="number" value={amountInMTR} onChange={handleMTRChange}  id="crypto-input" className="block p-2.5 sm:h-full w-full z-20 text-sm sm:text-2xl text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="0.323 MTR" required />
                    </div>
                    <button id="dropdown-crypto-button" className="flex-shrink-0 z-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                        <Image src="/images/Metri.png" alt="metri" width={20} height={20} className="me-2.5"/>
                        <p className="hidden sm:block">METRI</p> 
                    </button>
                </div>
            </div>
        </form>
        <div className=" space-x-0  rtl:space-x-reverse flex items-center flex-col mb-4 mt-52">
            <button onClick={() => setOpenModal(true)} className=" text-gray-50  duration-300 relative group cursor-pointer hover:text-darkGreen   overflow-hidden h-16 w-48 rounded-md bg-darkGreen bg-opacity-95 p-2  font-extrabold hover:bg-orange">
                <div className="absolute justify-center items-center flex group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-12 top-12 bg-darkGreen opacity-40">
                    <CiBank/>
                </div>
                <div className="absolute  group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-20 -top-6 bg-orange-500">
                </div>
                <div className="absolute justify-center items-center flex group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8   rounded-full group-hover:scale-150  duration-700 right-32 top-1 bg-darkGreen opacity-70">
                    <TbCurrencySolana/>
                </div>
                <div className="absolute justify-center items-center flex group-hover:-top-1 group-hover:-right-2 z-10 w-5 h-5   rounded-full group-hover:scale-150  duration-700 right-2 top-12 bg-darkGreen ">
                    <TbCurrencyBitcoin/>
                </div>
                <p className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" >Buy Metri</p>
            </button>
        </div>
        <BuyModal currentMTRPriceinUsd={currentMTRPriceinUsd} openModal={openModal} setOpenModal={setOpenModal} amountInMTR={amountInMTR} selectedCoin={selectedCoin} amountToBuy={amountToBuy} />
    </div>


    )
} 

interface BuyModalProps {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    amountInMTR: string;
    selectedCoin: Coin;
    amountToBuy: string;
    currentMTRPriceinUsd: number;
}

const BuyModal: React.FC<BuyModalProps> = ({openModal, setOpenModal, amountInMTR, selectedCoin, amountToBuy, currentMTRPriceinUsd}) => {

    enum typeOfPaymentEnum {
        BANK = 'BANK',
        BTC = 'BTC',
        SOL = 'SOL',
        ETH = 'ETH',
        BNB = 'BNB'
    }
    enum walletAddressEnum {
        BANK = 'BANK',
        BTC = '0x0',
        SOL = '0x0',
        ETH = '0x0',
        BNB = '0xfbb14cc8166f2ad09bbd684486a31e5c417675e4'
    }
    const [modalPlacement, setModalPlacement] = useState<ModalProps['position']>('center')
    const [typeOfPayment, setTypeOfPayment] = useState<typeOfPaymentEnum | undefined>()
    const [amountInCurrencySelected, setAmountInCurrencySelected] = useState<number>(0)
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [qrCode, setQrCode] = useState<string>()

    function calculateMtrToTypeOfPaymentSelected(mtrAmount: number, mtrToUsdRate: number, typeOfPaymentRateInUsd: number) {
        const usdAmount = mtrAmount * mtrToUsdRate;
        const equivalent = usdAmount / typeOfPaymentRateInUsd;
        return equivalent;
    }

    const fetchPrices = useCallback(async () => {
        console.log('Fetching prices')
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids: 'bitcoin,binancecoin,ethereum',
                    vs_currencies: 'usd'
                }
            });
            let amount;
            switch (typeOfPayment) {
                case typeOfPaymentEnum.BTC:
                    amount = calculateMtrToTypeOfPaymentSelected(Number(amountInMTR), currentMTRPriceinUsd , response.data.bitcoin.usd);
                    break;
                case typeOfPaymentEnum.BNB:
                    amount = calculateMtrToTypeOfPaymentSelected(Number(amountInMTR), currentMTRPriceinUsd , response.data.binancecoin.usd);
                    break;
                case typeOfPaymentEnum.ETH:
                    amount = calculateMtrToTypeOfPaymentSelected(Number(amountInMTR), currentMTRPriceinUsd , response.data.ethereum.usd);
                    break;
                /* case typeOfPaymentEnum.BANK:
                    amount = prices.usd;
                    break; */
                default:
                    amount = 0;
                    break;
            }
            setAmountInCurrencySelected(amount);
            return amount;
/*             startCountDown();
 */        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    }, [amountInMTR, currentMTRPriceinUsd, typeOfPayment, typeOfPaymentEnum.BNB, typeOfPaymentEnum.BTC, typeOfPaymentEnum.ETH]); // Add an empty array as the second argument to useCallback

    const handdleShowDetails = async () => {
        if (typeOfPayment) {
            setShowDetails(true);
            const amountIntypeOfPayment = await fetchPrices();
            if (!amountIntypeOfPayment) return; //TODO ERROR HANDLER 
            const createPaymentProps: CreatePaymentParams = {
                payment: {
                    crypto_type: typeOfPayment,
                    amount: amountIntypeOfPayment,
                    metri_equivalent: Number(amountInMTR),
                    blockchain: typeOfPayment,
                    wallet_address: walletAddressEnum[typeOfPayment],
                }
            }
            const reportPayment = await createPayment(createPaymentProps)
            if (reportPayment.data)
            setQrCode(reportPayment.data?.qr_code_svg)
            return
        }
    }

    const finishPurchase = async () => {
        setShowDetails(false)
        setOpenModal(false)
    }

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
                },
                content: {
                    inner: 'relative flex max-h-[95dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700'
                }
            }}
            onClose={() => setOpenModal(false)}
        >
        <Modal.Header>
          <h2 className="text-lg font-semibold">{showDetails? 'Payment Details' : 'Choose Payment Method'}</h2>
        </Modal.Header>
        <Modal.Body>
        <div className="flex flex-col justify-start gap-6 ">
            {
                showDetails ? (
                    <div>
                        <button onClick={() => setShowDetails(false)}>
                            <FaArrowLeft/>
                        </button>
                        <p>Details</p>
                        <div className="flex flex-col gap-4 ">
                            <div className="flex justify-between">
                                <p>amount in {selectedCoin.name}</p>
                                <div className="flex items-center">
                                    <p>{amountToBuy}</p>
                                    {selectedCoin.icon}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <p>Rate in {typeOfPayment?.toUpperCase()}</p>
                                <p>{amountInCurrencySelected}</p>
                            </div>

                            {qrCode && <div dangerouslySetInnerHTML={{__html: qrCode}} className="flex justify-center"></div>}
                            {typeOfPayment && (
                                <>
                                    <CopyToClipboard text={walletAddressEnum[typeOfPayment]} >
                                        <span className="group cursor-pointer">
                                            {walletAddressEnum[typeOfPayment]}
                                        </span>
                                    </CopyToClipboard>
                                </>
                            )}
                            
                            {/* <div className="flex items-center justify-cente</div>r w-full gap-1.5 count-down-main">
                                <div className="timer">
                                    <div className="rounded-xl bg-gradient-to-b from-indigo-600 to-purple-600 py-3 min-w-[96px] flex items-center justify-center flex-col gap-1 aspect-square px-3">
                                    <h3 className="countdown-element minutes font-manrope font-semibold text-2xl text-white text-center">5</h3>
                                    <p className="text-lg font-manrope font-normal text-white mt-1 text-center w-full">Minutes</p>
                                    </div>
                                </div>
                                <h3 className="font-manrope font-semibold text-2xl text-gray-900">:</h3>
                                <div className="timer">
                                    <div className="rounded-xl bg-gradient-to-b from-indigo-600 to-purple-600 py-3 min-w-[96px] flex items-center justify-center flex-col gap-1 aspect-square px-3">
                                    <h3 className="countdown-element seconds font-manrope font-semibold text-2xl text-white text-center">0</h3>
                                    <p className="text-lg font-manrope font-normal text-white mt-1 text-center w-full">Seconds</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                )
                : 
                <>
                {/* TODO ADD COMPATIBILITY WIth bank */}
                <div>
                    <p>Fiat payment</p>
                    <button disabled onClick={() => handlePaymentType(typeOfPaymentEnum.BANK)} className={`flex w-full  justify-start items-center gap-4 px-[16px] rounded-[10px] relative border ${typeOfPayment === typeOfPaymentEnum.BANK ? 'border-lightGreen': ''} disabled:opacity-80 focus:border-lightGreen border-solid cursor-pointer py-[12px] h-[76px] mt-[12px]`}>
                        <CiBank className="w-8 h-8"/>
                        Bank Transfer (Soon)
                    </button>
                </div>
                <div >
                    <p>Crypto Payment</p>
                    <button  onClick={() => handlePaymentType(typeOfPaymentEnum.BTC)} className={`flex w-full  justify-start items-center gap-4 px-[16px] rounded-[10px] relative border ${typeOfPayment === typeOfPaymentEnum.BTC ? 'border-lightGreen': ''} hover:border-lightGreen focus:border-lightGreen border-solid cursor-pointer py-[12px] h-[76px] mt-[12px]`}>
                        <TbCurrencyBitcoin className="w-8 h-8"/>
                        Bitcoin
                    </button>
                    <button onClick={() => handlePaymentType(typeOfPaymentEnum.BNB)} className={`flex w-full  justify-start items-center gap-4 px-[16px] rounded-[10px] relative border ${typeOfPayment === typeOfPaymentEnum.BNB ? 'border-lightGreen' : ''} hover:border-lightGreen focus:border-lightGreen border-solid cursor-pointer py-[12px] h-[76px] mt-[12px]`}>
                        <TbBrandBinance className="w-8 h-8"/>
                        Binance smart chain
                    </button>
                    <button onClick={() => handlePaymentType(typeOfPaymentEnum.ETH)} className={`flex w-full  justify-start items-center gap-4 px-[16px] rounded-[10px] relative border ${typeOfPayment === typeOfPaymentEnum.ETH ? 'border-lightGreen' : ''}  hover:border-lightGreen focus:border-lightGreen border-solid cursor-pointer py-[12px] h-[76px] mt-[12px]`}>
                        <TbCurrencyEthereum className="w-8 h-8"/>
                        Ethereum
                    </button>
                </div>
                </>
            }
            
        </div>
        </Modal.Body>
        <Modal.Footer>
          <button disabled={typeOfPayment === undefined} onClick={ showDetails ? finishPurchase : handdleShowDetails} className="bg-orange disabled:opacity-80 disabled:cursor-not-allowed w-full items-center appearance-none border-b-gray-800 rounded-bl-lg rounded-br-lg border-l-gray-800 border-l-0 border-r-gray-800 border-r-0 border-t-gray-800 rounded-tl-lg rounded-tr-lg box-border text-gray-800 space-x-1.5 cursor-pointer flex text-base font-medium h-12 justify-center leading-6 mb-0 ml-0 mr-0 mt-0 min-h-12 min-w-20 outline-none overflow-x-hidden overflow-y-hidden pb-0 pl-4 pr-4 pt-0 space-y-1.5 text-center no-underline overflow-ellipsis whitespace-nowrap select-none break-all">
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