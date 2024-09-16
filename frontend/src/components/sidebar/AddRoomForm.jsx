import { useState } from "react";
import toast from "react-hot-toast";
import React from 'react';
import { FaUserGroup } from "react-icons/fa6";

const AddRoom = ({ onRoomAdded }) => {
    const [roomName, setRoomName] = useState("");

    const handleAddRoom = async (e) => {
        e.preventDefault();
        if (!roomName.trim()) {
            toast.error("Room name cannot be empty!");
            return;
        }

        try {
            const res = await fetch("/api/room", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ roomName: roomName }),
            });
            
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            toast.success("Room created successfully!");
            onRoomAdded(data); // Notify parent component about the new room
            setRoomName("");   // Clear input field
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleAddRoom}  className='flex items-center gap-2'>
            <input
                type="text"
                placeholder="Add a room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className='input input-bordered rounded-full'
            />
            <button type='submit' className='btn btn-circle'>
                <FaUserGroup color="#0ea5e9" type="submit" className="w-6 h-6 outline-none" />
			</button>
            
        </form>
    );
};

export default AddRoom;
