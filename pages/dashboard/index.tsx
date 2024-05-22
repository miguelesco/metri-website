import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from "@components/sidebar";
import UserInfo from "@components/userInfo";
import { NextPageWithLayout } from "@layouts/Baseof";
import dynamic from "next/dynamic";
import { checkSession } from "@lib/utils/checkSession";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserDashboard: NextPageWithLayout = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await fetch('http://localhost:3001/api/v1/balance', {
        credentials: 'include', // Include cookies in the request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    };

    const checkUserSession = async () => {
      const sessionActive = await checkSession();
      if (!sessionActive) {
        alert('Your session has expired. Please log in again.');
        router.push('/login');
      }
    };

    fetchBalance();

    const sessionInterval = setInterval(checkUserSession, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(sessionInterval);
  }, [router]);

  return (
    <div className="bg-white ">
      <UserInfo chartOptions={chartOptions}/>
    </div>
  );
};

UserDashboard.getLayout = (page) => {
  return (
    <Sidebar>
      {page}
    </Sidebar>
  );
};

export default UserDashboard;
