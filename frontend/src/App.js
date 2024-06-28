import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login";
import AddQuote from "./pages/AddQuote";
import About from "./pages/About"

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user/register" element={<Register />} />
					<Route path="/user/login" element={<Login />} />
					<Route path="/new/quote" element={<AddQuote />} />
					<Route path="/about" element={<About />}/>
				</Routes>
			</Router>
		</>
	)
}

export default App