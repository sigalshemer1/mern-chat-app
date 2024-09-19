import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import  SocketMessagesRoomProvider from "./context/SocketMessagesRoom.jsx"; // Corrected import for default export
import useUIStore from "./zustand/useUIStore"; // Ensure this path is correct

const Root = () => {
    const { selectedTab } = useUIStore(); // Call the hook inside the component
    return (
        <React.StrictMode>
            <BrowserRouter>
                <AuthContextProvider>
                    <SocketContextProvider>
                    {selectedTab === "rooms" ? (
                        <SocketMessagesRoomProvider>
                            <App />
                        </SocketMessagesRoomProvider>
                    ) : (
                            <App />
                    )}
                    </SocketContextProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
