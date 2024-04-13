import Image from "next/image";
import Watch from "./watch";
import { getUserInfo } from "@lib/firebase/config";
import { useEffect, useState } from "react";
import ChartComponent from "./chart";
import ApexCharts from "apexcharts";

interface UserInfoProps {
	chartOptions : ApexCharts.ApexOptions;
}

const UserInfo: React.FC<UserInfoProps> = ({chartOptions}) => {

	const [user , setUser] = useState<any>(null);
	const [supply, setSupply] = useState<number>(5000000);
	const [soldTokens, setSoldTokens] = useState<number>(2000000);
	const [daysLeft, setDaysLeft] = useState<number>(12);
	const [porcentage, setPorcentage] = useState<string>();

	console.log(porcentage, 'porcentage')

	useEffect(() => {
		const user = getUserInfo();
		console.log(user)
		setUser(user);
		setPorcentage(((soldTokens / supply) * 100).toFixed(0).toString() + '%')
	} , [soldTokens, supply]);

    return (
        <div
				className="bg-white h-full rounded-3xl p-8 w-full grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-5 xl:gap-8 md:col-start-2 md:row-start-2"
			>
				<section className="space-y-8 ">
					<h2 className="font-semibold text-xl sm:text-2xl">Dashboard</h2>
					
					<Watch user={user}/>
				</section>
				<section className="space-y-8 xl:col-span-3 xl:col-start-2 xl:row-start-1">
					<h2 className="font-semibold text-xl sm:text-2xl">Goal</h2>
					<div className="grid grid-cols-1  gap-4">
						<ChartComponent options={chartOptions} />
					</div>
				</section>
				<section className="md:col-span-2 flex flex-col space-y-8 xl:col-span-2 mt-5">
					<h2 className="font-semibold text-xl sm:text-2xl">Recent Transactions</h2>
                <table className="w-full" cellPadding={0} border={0}>
						<tbody className="divide-y w-full md:table-row-group space-y-4">
                            <tr
                                className="w-full relative grid grid-cols-3 grid-rows-2 md:table-row items-center gap-x-2"
                                style={{ gridTemplateColumns: '1fr 6fr 2fr' }}
                            >
								<td className="col-span-1 row-span-2">
									<span
										className="bg-gray-100 p-2 rounded-xl md:bg-transparent md:p-0 flex items-center"
									>
										<svg
											className="h-8 w-8 text-gray-800"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
											/>
										</svg>
									</span>
								</td>
								<td className="col-start-2 col-end-3 row-start-1 row-end-1">
									<span
										className="font-medium text-lg sm:text-lg tracking-tight text-gray-800 leading-none"
										>Shopping</span
									>
								</td>
								<td className="col-start-2 col-end-3 row-start-2 row-end-2">
									<span
										className="font-normal text-base tracking-tight text-gray-500 leading-none"
										>05 June 20202 10:00</span
									>
								</td>
								<td
									className="col-start-3 col-end-4 row-start-1 row-end-3 text-right place-items-center"
								>
									<span
										className="font-medium text-lg sm:text-lg tracking-tight text-gray-800"
										>$300</span
									>
								</td>
								<td className="hidden md:flex justify-end items-center">
									
									<button
										className="flex items-center px-2 py-2 opacity-80 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black rounded-xl"
									>
										<svg
											className="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
											/>
										</svg>
									</button>
								</td>
							</tr>
                            <tr
                                className="w-full relative grid grid-cols-3 grid-rows-2 md:table-row items-center gap-x-2"
                                style={{ gridTemplateColumns: '1fr 6fr 2fr' }}
>
								<td className="col-span-1 row-span-2">
									<span
										className="bg-gray-100 p-2 rounded-xl md:bg-transparent md:p-0 flex items-center"
									>
										<svg
											className="h-8 w-8 text-gray-800"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
											/>
										</svg>
									</span>
								</td>
								<td className="col-start-2 col-end-3 row-start-1 row-end-1">
									<span
										className="font-medium text-lg sm:text-lg tracking-tight text-gray-800 leading-none"
										>Groceries</span
									>
								</td>
								<td className="col-start-2 col-end-3 row-start-2 row-end-2">
									<span
										className="font-normal text-base tracking-tight text-gray-500 leading-none"
										>12 June 20202 14:05</span
									>
								</td>
								<td
									className="col-start-3 col-end-4 row-start-1 row-end-3 text-right place-items-center"
								>
									<span
										className="font-medium text-lg sm:text-lg tracking-tight text-gray-800"
										>$300</span
									>
								</td>
								<td className="hidden md:flex justify-end">
									<button
										className="flex items-center px-2 py-2 opacity-80 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black rounded-xl"
									>
										<svg
											className="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
											/>
										</svg>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</section>
				<section
					className="bg-gray-100 rounded-3xl overflow-hidden xl:col-start-4 xl:row-span-5 xl:row-start-1"
				>
					<div className="flex flex-col space-y-8 h-full py-8">
						<header className="text-center">
							<h3
								className="text-gray-500 font-medium text-lg sm:text-lg tracking-tight"
							>
								Saved This Month
							</h3>
							<p className="py-4 font-semibold text-xl sm:text-2xl">$25,999.00</p>
						</header>
						<nav className="flex items-center w-full justify-center">
							<ul className="flex space-x-6">
								<li>
									<button
										className="font-medium text-gray-400 hover:bg-gray-200 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
									>
										Day
									</button>
								</li>
								<li>
									<button
										className="font-medium text-gray-400 hover:bg-gray-200 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
									>
										Week
									</button>
								</li>
								<li>
									<button
										className="font-medium px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
									>
										Month
									</button>
								</li>
								<li>
									<button
										className="font-medium text-gray-400 hover:bg-gray-200 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
									>
										Year
									</button>
								</li>
							</ul>
						</nav>
						<div
							className="flex flex-col flex-1 flex-grow justify-start items-center space-y-8"
						>
							<div className="relative w-full">
								<div className="overflow-y-visible overflow-x-scroll">
									<canvas id="myChart" width="500" height="200"></canvas>
								</div>
							</div>

                            <div
                                className="flex items-center justify-center overflow-y-visible overflow-x-auto w-full mx-auto pb-4 pt-4"
                                style={{ scrollSnapType: 'x mandatory' }}
                            >
								<ul className="flex space-x-8 whitespace-nowrap">
									<li>
										<button
											className="font-medium text-gray-400 hover:bg-gray-300 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
										>
											May
										</button>
									</li>
									<li>
										<button
											className="font-medium text-gray-400 hover:bg-gray-300 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
										>
											Jun
										</button>
									</li>
									<li>
										<button
											className="font-medium text-gray-400 hover:bg-gray-300 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
										>
											July
										</button>
									</li>
									<li>
										<button
											className="font-medium text-gray-400 hover:bg-gray-300 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
										>
											Aug
										</button>
									</li>
									<li>
										<button
											className="font-medium text-gray-400 hover:bg-gray-300 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
										>
											Sep
										</button>
									</li>
									<li>
										<button
											className="font-medium text-white px-2 py-1 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-black"
										>
											Oct
										</button>
									</li>
									<li>
										<button
											className="font-medium text-gray-400 hover:bg-gray-300 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
										>
											Nov
										</button>
									</li>
								</ul>
							</div>
							<div className="max-w-lg w-full px-4">
								<div className="relative mt-12 w-full">
									<div
										className="bg-gray-300 absolute inset-0 transform -translate-y-12 rounded-2xl opacity-20 scale-75"
									></div>
									<div
										className="bg-gray-300 absolute inset-0 transform -translate-y-8 rounded-2xl opacity-25 scale-90"
									></div>
									<div
										className="bg-gray-300 absolute inset-0 transform -translate-y-4 rounded-2xl opacity-75 scale-95"
									></div>
									<div
										className="bg-[#0AA8A7] p-4 rounded-xl flex space-x-4 shadow-md relative w-full items-center"
									>
										<div
											className="flex flex-col items-center justify-center flex-grow"
										>
											<h4 className="text-gray-300 text-lg opacity-50">
												Plan for 2020
											</h4>
											<p className="text-gray-100 text-lg sm:text-xl md:text-2xl">
												Completed
											</p>
										</div>
										<div
											className="flex items-center justify-center flex-shrink-0 flex-grow"
										>
											<svg
												className="h-24 w-24 text-2xl text-white"
												viewBox="0 0 100 100"
												xmlns="http://www.w3.org/2000/svg"
											>
												<circle
													cx="50"
													cy="50"
													r="44"
													fill="transparent"
													stroke="currentColor"
													strokeWidth="12"
												/>
												<text
													x="50%"
													y="50%"
													textAnchor="middle"
													fill="currentColor"
													dy=".3em"
												>
													75%
												</text>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div> 
    )
}

export default UserInfo;