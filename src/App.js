import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Plants from './pages/plants/plants';
import Login from './pages/login';
import Contact from './pages/contact';
import Plant from './pages/plants/plant'
import NewPlant from './pages/plants/newPlant'

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/plants' element={<Plants />} />
				<Route path='/plants/:id' element={<Plant />} />
				<Route path='/login' element={<Login />} />
				<Route path='/plants/new' element={<NewPlant />} />
			</Routes>
		</Router>
	);
}

export default App;
