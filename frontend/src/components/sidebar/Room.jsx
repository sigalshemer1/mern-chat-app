import { useEffect } from 'react';

const Room = ({ room, lastIdx, emoji, setSelectedRoom }) => {
    const handleClick = () => {
        setSelectedRoom(room);
    };

    return (
        <div
            className={`flex gap-2 items-center hover:bg-sky-500 rounded h-12 p-2 py-1 cursor-pointer`}
            onClick={handleClick}
        >
            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray-200'>{room.roomName}</p>
                    <span className='text-xl'>{emoji}</span>
                </div>
            </div>
            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </div>
    );
};

export default Room;




// const Room = ({ room, lastIdx, emoji, setSelectedRoom }) => { // Accept setSelectedRoom as a prop
// 	const isSelected = false; // Implement your logic to determine if this room is selected

// 	return (
// 		<>
// 			<div
// 				className={`flex gap-2 items-center hover:bg-sky-500 rounded h-12 p-2 py-1 cursor-pointer
// 				${isSelected ? "bg-sky-500" : ""}`}
// 				onClick={() => setSelectedRoom(room)} // Call setSelectedRoom on click
// 			>
// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>{room.roomName}</p>
// 						<span className='text-xl'>{emoji}</span>
// 					</div>
// 				</div>
// 			</div>

// 			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
// 		</>
// 	);
// };

// export default Room;

  



// import useRoom from "../../zustand/useRoom";

// const Room = ({ room, lastIdx ,emoji}) => {
// 	const { selectedRoom, setSelectedRoom } = useRoom();

// 	const isSelected = selectedRoom?._id === room._id;
	
// 	return (
// 		<>
// 			<div
// 				className={`flex gap-2 items-center hover:bg-sky-500 rounded h-12 p-2 py-1 cursor-pointer
// 				${isSelected ? "bg-sky-500" : ""}
// 			`}
// 				onClick={() => setSelectedRoom(room)}
// 			>
// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>{room.roomName}</p>
// 						<span className='text-xl'>{emoji}</span>
// 					</div>
// 				</div>
// 			</div>

// 			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
// 		</>
// 	);
// };
// export default Room;