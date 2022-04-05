import React from "react"

import Login from './Login.jsx'
import SignIn from './SignIn.jsx'

const UserPage = ({setIsLogedIn,setUsername}) => {
	const [isRegis, setIsRegis] = React.useState(false)


	return (
		<React.Fragment>

			{isRegis ? <SignIn setIsRegis={setIsRegis}/>: <Login setIsRegis={setIsRegis} setIsLogedIn={setIsLogedIn} setUsername={setUsername}/>}

		</React.Fragment>
	)
}

export default UserPage