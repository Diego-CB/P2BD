import React from "react"
import { createRoot } from 'react-dom/client'

import setIcon from './util/setIcon.js'
import DirectUser from "./pages/DirectUser.jsx"
import UserPage from "./pages/UserPage.jsx"

import './styles/master.css'

// App
const App = () => {
	setIcon()
	const [isLogedIn, setIsLogedIn] = React.useState(false)
	const [username, setUsername]=React.useState('')
	const [isAdmin, setIsAdmin] = React.useState(false)

	if (isLogedIn) return <DirectUser username={username} isAdmin={isAdmin}/>

	return (
		<UserPage 
			setIsAdmin={setIsAdmin}
			setIsLogedIn={setIsLogedIn} 
			setUsername={setUsername}
		/>
	)
}

// Render
const getRoot = () => document.getElementById('root')
createRoot(getRoot()).render(<App/>)
