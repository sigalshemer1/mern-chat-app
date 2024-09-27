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

	return { loading, rooms};
};
export default useGetRooms;
