import Sidebar from "@components/sidebar";
import UserInfo from "@components/userInfo";

export default function UserDashboard() { 
    return (
        <div className="bg-white ">
			<Sidebar 
				
			>
			<UserInfo />
			</Sidebar>
			
        </div>

        
    )
};