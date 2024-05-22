import Watch from "./watch";
import { useEffect, useState } from "react";
import ChartComponent from "./chart";
import ApexCharts from "apexcharts";
import Timeline from "./Timeline";
import { getCurrentUser } from "@lib/utils/getCurrentUser";

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

		const getUser = async () => {
			const user = await getCurrentUser();
			console.log(user)
			setUser(user);
		}
		getUser();
		setPorcentage(((soldTokens / supply) * 100).toFixed(0).toString() + '%')
	} , [soldTokens, supply]);

    return (
        <div
				className="bg-white h-full rounded-3xl p-8 w-full flex flex-wrap gap-8 "
			>
				<section className="space-y-8 flex-none mx-auto">
					<h2 className="font-semibold text-xl sm:text-2xl">Dashboard</h2>
					
					<Watch user={user}/>
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
				<section className="flex-none flex flex-col space-y-8 mt-5 2xl:relative 2xl:bottom-[291px] 2xl:w-[830px]">
					<h2 className="font-semibold text-xl sm:text-2xl">Transaction History</h2>
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
				
			</div> 
    )
}

export default UserInfo;