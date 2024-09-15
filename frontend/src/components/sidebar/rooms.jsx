import useGetRooms from "../../hooks/useGetRoom";
import { getRandomEmoji } from "../../utils/emojis";
import Room from "./Room";

const Rooms = () => {
	const { loading, rooms } = useGetRooms();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{rooms.map((room, idx) => (
				<Room
					key={room._id}
					room={room}
                    emoji={getRandomEmoji()}
					lastIdx={idx === rooms.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Rooms;