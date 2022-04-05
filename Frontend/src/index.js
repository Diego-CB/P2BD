import React from "react"
import { createRoot } from 'react-dom/client'

import Perfiles from "./pages/Perfiles.jsx"
import UserPage from "./pages/UserPage.jsx"

import './styles/master.css'

const App = () => {
	const [isLogedIn, setIsLogedIn] = React.useState(false)
	const [username, setUsername]=React.useState('')
	const [plan, setPlan]= React.useState('')

	return (
		<React.Fragment>
			{isLogedIn ? <Perfiles setUsername={setUsername}/>:<UserPage setIsLogedIn={setIsLogedIn} setUsername={setUsername}/>}
		</React.Fragment>
	)
}

const getRoot = () => document.getElementById('root')
createRoot(getRoot()).render(<App/>)
