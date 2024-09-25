import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

const Root = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <AuthContextProvider>
                    <SocketContextProvider>
                            <App />     
                    </SocketContextProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
