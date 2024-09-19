import { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import RoomList from "./RoomList";
import ToggleSideBar from "./ToggleSideBar";
import useUIStore from "../../zustand/useUIStore";

const Sidebar = () => {
	const { selectedTab, setSelectedTab } = useUIStore();

    // Callback to handle the value from ToggleSideBar
    const handleToggle = (value) => {
        setSelectedTab(value); // Update the state with the selected value
    };

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <ToggleSideBar onToggle={handleToggle} />
            <div className='divider px-3'></div>
            {selectedTab === "rooms" ? (
                    <RoomList />
            ) : (
                <>
                    <SearchInput />  
                    <div className='divider px-3'></div>
                    <Conversations /> 
                </>
            )}
            <LogoutButton />
        </div>
    );
};

export default Sidebar;