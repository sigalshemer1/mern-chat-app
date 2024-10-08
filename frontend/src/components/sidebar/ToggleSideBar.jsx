import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
let selectedTab;

const ToggleSideBar = ({ onToggle }) => {
    const handleClick = (event) => {
        const iconElement = event.currentTarget.querySelector("svg");
        if (iconElement && iconElement.id) {
            selectedTab=iconElement.id;
            onToggle(iconElement.id); // Call the callback with the id (rooms/chats)
        }
    };

    return (
        <div className='flex items-center gap-2'>
            <button className='btn btn-circle toggleBtn' onClick={handleClick}>
                <FaUserGroup color="#0ea5e9" type="submit" className="w-6 h-6 outline-none" id="rooms" />
            </button>
            <button className='btn btn-circle toggleBtn' onClick={handleClick}>
                <IoChatboxEllipsesSharp color="#0ea5e9" type="submit" className="w-6 h-6 outline-none" id="chats" />
            </button>
            <div>
                <h3 className="h-6 text-white font-bold ml-4 text-lg">
                {selectedTab === "rooms" ? ("Rooms list"):("Chats list")}
                </h3>
            </div>
        </div>
    );
};

export default ToggleSideBar;
