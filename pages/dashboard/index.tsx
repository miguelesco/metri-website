import Sidebar from "@components/sidebar";
import UserInfo from "@components/userInfo";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function UserDashboard() { 
  

    const chartOptions: typeof ApexChart.defaultProps = {
      type: "area",
      height: '100%',
      width: '100%',
      series: [
        {
          name: "Token value",
          data: [0.30, 0.50],
          color: "#0AA8A7",
        },
      ],
      options: {
        chart: {
          fontFamily: "Inter, sans-serif",
          dropShadow: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#033434",
            gradientToColors: ["#033434"],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 6,
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: 0
          },
        },
        xaxis: {
          categories: ['1 stage', '2 stage'],
          labels: {
            show: true,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: true,
          },
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
          }
        },
      },
    };

    return (
        <div className="bg-white ">
			<Sidebar 
				
			>
			<UserInfo chartOptions={chartOptions}/>
			</Sidebar>
			
        </div>

        
    )
};