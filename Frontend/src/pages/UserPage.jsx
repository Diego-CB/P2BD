import React from "react"

import Login from './Login.jsx'
import SignIn from './SignIn.jsx'

import '../styles/login.css'

const UserPage = ({ setIsLogedIn,setUsername, setIsAdmin }) => {
	const [isRegis, setIsRegis] = React.useState(false)

	if (isRegis) return <SignIn setIsRegis={setIsRegis}/>
	
	return (
		<Login 
			setIsRegis={setIsRegis} 
			setIsLogedIn={setIsLogedIn} 
			setUsername={setUsername}
			setIsAdmin={setIsAdmin}
		/>
	)
}

export default UserPage