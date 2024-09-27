import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home"; // Ensure this has the sidebar and message container
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { useState } from "react"; // Import useState

function App() {
	const { authUser } = useAuthContext();
	const [selectedRoom, setSelectedRoom] = useState(null); // State for selected room
	const [selectedTab, setSelectedTab] = useState("rooms"); // State for tab selection

	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route
					path='/'
					element={authUser ? <Home selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} selectedTab={selectedTab} setSelectedTab={setSelectedTab} /> : <Navigate to={"/login"} />}
				/>
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
