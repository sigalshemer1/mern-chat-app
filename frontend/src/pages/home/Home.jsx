import { useState } from "react"; // Import useState
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	const [selectedRoom, setSelectedRoom] = useState(null); // State for selected room
	const [selectedTab, setSelectedTab] = useState("rooms"); // State for selected tab

	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar setSelectedRoom={setSelectedRoom} /> {/* Pass down the setSelectedRoom prop */}
			<MessageContainer selectedRoom={selectedRoom} selectedTab={selectedTab} />
		</div>
	);
};

export default Home;

