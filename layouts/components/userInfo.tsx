import { FaArrowsRotate } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Watch from "./watch";
import { useEffect, useState } from "react";
import ChartComponent from "./chart";
import ApexCharts from "apexcharts";
import Timeline from "./Timeline";
import { ICurrentUser, IHistoryResponse } from "@lib/utils/interfaces";
import { getMetriExchangeRate } from "@lib/utils/API/getMetriPrice";
import { getCurrentUser, getUserHistory } from "@lib/utils/API/user";
import { Tooltip } from "flowbite-react";

interface UserInfoProps {
	chartOptions : ApexCharts.ApexOptions;
}

const ITEMS_PER_PAGE = 5;

const UserInfo: React.FC<UserInfoProps> = ({chartOptions}) => {

	const [user , setUser] = useState<ICurrentUser>();
	const [metriExchangeRate, setMetriExchangeRate] = useState<number>(0);
	const [userHistory, setUserHistory] = useState<IHistoryResponse[]>();
	const [supply, setSupply] = useState<number>(5000000);
	const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [soldTokens, setSoldTokens] = useState<number>(2000000);
	const [daysLeft, setDaysLeft] = useState<number>(12);
	const [porcentage, setPorcentage] = useState<string>();

	let totalPages = 0;

	if (userHistory) {
		totalPages = Math.ceil(userHistory.length / ITEMS_PER_PAGE);
	}

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
	};
	
	const handlePrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const handlePageClick = (page: number) => {
		setCurrentPage(page);
	};

	const paginatedData = userHistory?.toReversed().slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

	useEffect(() => {

		const getUser = async () => {
			const user = await getCurrentUser();
			if (user.data)
			setUser(user.data);
		}
		const metriExchangeRate = async () => {
			const metriExchangeRate = await getMetriExchangeRate();
			if (metriExchangeRate.data)
			setMetriExchangeRate(metriExchangeRate.data.current_price);
		}
		const userHistory = async () => {
			const history = await getUserHistory();
			if (history.data)
			setUserHistory(history.data);
		}
		getUser();
		metriExchangeRate();
		userHistory();
		setPorcentage(((soldTokens / supply) * 100).toFixed(0).toString() + '%')
	} , [soldTokens, supply ]);


	const handleCopy = (index: number) => {
		setVisibleIndex(index);
		setTimeout(() => {
		setVisibleIndex(null);
		}, 1000);
	};

    return (
        <div
				className="bg-white h-full rounded-3xl p-8 w-full flex flex-wrap gap-8 "
			>
				<section className="space-y-8 flex-none mx-auto">
					<h2 className="font-semibold text-xl sm:text-2xl">Dashboard</h2>
					
					<Watch userData={user} exchangeRate={metriExchangeRate}/>
				</section>
				<section className="space-y-8 xl:basis-5/12 lg:basis-2/4 flex-auto ">
					<h2 className="font-semibold text-xl sm:text-2xl">Goal</h2>
					<div className="grid grid-cols-1  gap-4">
						<ChartComponent options={chartOptions} />
					</div>
				</section>
				<section
					className="bg-gray-100 rounded-3xl overflow-hidden xl:basis-2/6 lg:basis-2/4 flex-auto lg:order-last 2xl:-order-none"
				>
					<div className="flex flex-col space-y-8 h-full py-8">
					<Timeline/>

					</div>
				</section>
				<section className="flex flex-col space-y-8 mt-5 2xl:relative 2xl:bottom-[291px] 2xl:w-[830px]  overflow-x-auto">
						<h2 className="font-semibold text-xl sm:text-2xl">Transaction History</h2>
						<div className="relative overflow-x-auto">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" cellPadding={0} border={0}>
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-3">
											
										</th>
										<th scope="col" className="px-6 py-3">
											Status
										</th>
										<th scope="col" className="px-6 py-3">
											Date
										</th>
										<th scope="col" className="px-6 py-3">
											Amount
										</th>
										<th scope="col" className="px-6 py-3">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y-8 divide-transparent w-full h-60 md:table-row-group space-y-4">
									{
										paginatedData?.map((history, index) => (
											<tr
											key={index}
											className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
											style={{ gridTemplateColumns: '1fr 6fr 2fr' }}
										>
											<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{history.status === 'completed' ? <IoCheckmarkDoneOutline/> : <FaArrowsRotate/>}
											</th>
											<td className="px-6 py-4">
												<span
													className="font-medium text-lg sm:text-lg tracking-tight text-gray-800 leading-none"
													>{history.status}</span
												>
											</td>
											<td className="px-6 py-4">
												<span
													className="font-normal text-base tracking-tight text-gray-500 leading-none"
													>{new Date(history.created_at).toLocaleString()}</span
												>
											</td>
											<td
												className="px-6 py-4"
											>
												<span
													className="font-medium text-lg sm:text-lg tracking-tight text-gray-800"
													>{history.amount} <span className="text-xs">MTR</span></span
												>
											</td>
											<td className=" px-6 py-4">
												
												<div className="flex justify-center gap-2">
													
													<CopyToClipboard text={history.transaction_id} onCopy={() => handleCopy(index)}>
														<button className="outline-2 outline-slate-950 group cursor-pointer relative flex gap-1.5 px-4 py-2 bg-lightGreen bg-opacity-15 text-darkGreen text-opacity-70 rounded-2xl hover:bg-opacity-70 transition font-semibold shadow-md">
															Copy ID
															{visibleIndex === index && (
																<span className="pointer-events-none absolute opacity-0 group-focus:opacity-100 group-focus:text-gray-700 group-focus:text-sm group-focus:-translate-y-12 duration-700">
																	Copied to clipboard
																</span>
															)}
														</button>
													</CopyToClipboard>

													
													{history.status === 'completed' && history.transaction_hash && (
													<CopyToClipboard text={history.transaction_hash} onCopy={() => handleCopy(index)}>
														<button className="outline-2 outline-slate-950 group cursor-pointer relative flex gap-1.5 px-4 py-2 bg-lightGreen bg-opacity-15 text-darkGreen text-opacity-70 rounded-2xl hover:bg-opacity-70 transition font-semibold shadow-md">
															Copy Hash
															{visibleIndex === index && (
																<span className="pointer-events-none absolute opacity-0 group-focus:opacity-100 group-focus:text-gray-700 group-focus:text-sm group-focus:-translate-y-12 duration-700">
																	Copied to clipboard
																</span>
															)}
														</button>
													</CopyToClipboard>
													)}
												</div>
											</td>
										</tr>
										))
									}
								</tbody>
							</table>
							{/* <div className="flex justify-between mt-4" id="arrows">
								<button
								onClick={handlePrevPage}
								disabled={currentPage === 0}
								className={`px-4 py-2 bg-gray-200 text-gray-700 rounded ${currentPage === 0 && 'opacity-50 cursor-not-allowed'}`}
								>
								Previous
								</button>
								<div className="flex space-x-2">
								{Array.from({ length: totalPages }, (_, index) => (
									<button
									key={index}
									onClick={() => handlePageClick(index)}
									className={`px-4 py-2 ${currentPage === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
									>
									{index + 1}
									</button>
								))}
								</div>
								<button
								onClick={handleNextPage}
								disabled={currentPage === totalPages - 1}
								className={`px-4 py-2 bg-gray-200 text-gray-700 rounded ${currentPage === totalPages - 1 && 'opacity-50 cursor-not-allowed'}`}
								>
								Next
								</button>
							</div> */}
						</div>
				</section> 
				
			</div> 
    )
}

export default UserInfo;