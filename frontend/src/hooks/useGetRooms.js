import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetRooms = () => {
	const [loading, setLoading] = useState(false);
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		const getRooms = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/room");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setRooms(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getRooms();
	}, []);

	return { loading, rooms };
};
export default useGetRooms;


// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const useGetConversations = () => {
// 	const [loading, setLoading] = useState(false);
// 	const [conversations, setConversations] = useState([]);

// 	useEffect(() => {
// 		const getConversations = async () => {
// 			setLoading(true);
// 			try {
// 				// Fetch individual conversations
//                 const usersRes = await fetch("/api/users");
//                 const usersData = await usersRes.json();
//                 if (usersData.error) {
//                     throw new Error(usersData.error);
//                 }

//                 // Fetch chat rooms
//                 const roomsRes = await fetch("/api/rooms"); 
//                 const roomsData = await roomsRes.json();
//                 if (roomsData.error) {
//                     throw new Error(roomsData.error);
//                 }

//                 // Combine both lists
//                 const combinedConversations = [
//                     ...usersData.individuals, // Adjust based on the actual response structure
//                     ...roomsData.chatRooms,   // Adjust based on the actual response structure
//                 ];

//                 setConversations(combinedConversations);
// 			} catch (error) {
// 				toast.error(error.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		getConversations();
// 	}, []);

// 	return { loading, conversations };
// };
// export default useGetConversations;
