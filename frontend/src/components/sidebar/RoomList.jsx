import { useState, useEffect } from 'react';
import useGetRooms from "../../hooks/useGetRooms";
import { getRandomEmoji } from "../../utils/emojis";
import Room from "./Room";
import AddRoom from "./AddRoom";
import { useSocketContext } from '../../context/SocketContext';

const RoomList = ({ setSelectedRoom }) => { // Accept setSelectedRoom as a prop
    const { loading, rooms: initialRooms } = useGetRooms();
    const [rooms, setRooms] = useState(initialRooms);
    
    const { socket } = useSocketContext();

    useEffect(() => {
        setRooms(initialRooms);
    }, [initialRooms]);

    useEffect(() => {
        if (socket) {
            socket.on('roomAdded', (newRoom) => {
                setRooms((prevRooms) => [...prevRooms, newRoom]);
            });

            return () => {
                socket.off('roomAdded');
            };
        }
    }, [socket]);

    const handleRoomAdded = (newRoom) => {
        // Optionally handle local room addition if needed
    };

    return (
        <>
            <AddRoom onRoomAdded={handleRoomAdded} />
            <div className='divider px-3'></div>
            {rooms.map((room, idx) => (
                <Room
                    key={room._id}
                    room={room}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === rooms.length - 1}
                    setSelectedRoom={setSelectedRoom} // Pass setSelectedRoom to each Room
                />
            ))}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </>
    );
};

export default RoomList;



// import { useState, useEffect } from 'react';
// import useGetRooms from "../../hooks/useGetRooms";
// import { getRandomEmoji } from "../../utils/emojis";
// import Room from "./Room";
// import AddRoom from "./AddRoom";
// import { useSocketContext } from '../../context/SocketContext';

// const RoomList = () => {
//     const { loading, rooms: initialRooms } = useGetRooms();
//     const [rooms, setRooms] = useState(initialRooms);
    
//     const { socket } = useSocketContext();

//     useEffect(() => {
//         setRooms(initialRooms);
//     }, [initialRooms]);

//     useEffect(() => {
//         if (socket) {
//             socket.on('roomAdded', (newRoom) => {
//                 setRooms((prevRooms) => [...prevRooms, newRoom]);
//             });

//             return () => {
//                 socket.off('roomAdded');
//             };
//         }
//     }, [socket]);

//     const handleRoomAdded = (newRoom) => {
//         // Optionally handle local room addition if needed
//     };

//     return (
//         <>
//             <AddRoom onRoomAdded={handleRoomAdded} />
//             <div className='divider px-3'></div>
//             {rooms.map((room, idx) => (
//                 <Room
//                     key={room._id}
//                     room={room}
//                     emoji={getRandomEmoji()}
//                     lastIdx={idx === rooms.length - 1}
//                 />
//             ))}

//             {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
//         </>
//     );
// };

// export default RoomList;