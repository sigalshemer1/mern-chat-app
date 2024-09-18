import { useState, useEffect } from 'react';
import useGetRooms from "../../hooks/useGetRooms";
import { getRandomEmoji } from "../../utils/emojis";
import Room from "./Room";
import AddRoom from "./AddRoom";
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // The server URL

const RoomList = () => {
    const { loading, rooms: initialRooms } = useGetRooms();
    const [rooms, setRooms] = useState(initialRooms);

    useEffect(() => {
        setRooms(initialRooms);
    }, [initialRooms]);

    useEffect(() => {
        socket.on('roomAdded', (newRoom) => {
            setRooms((prevRooms) => [...prevRooms, newRoom]);
        });
    
        return () => {
            socket.off('roomAdded');
        };
    }, []);

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
                />
            ))}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </>
    );
};

export default RoomList;
