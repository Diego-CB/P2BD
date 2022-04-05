import React from "react"
import logo from '../images/logo.png'

const Header = ({title, user}) => {

	(user === null) ? user = ' ': ''

	return (
		<header>
			<img src={logo} alt=""/>
			<h2>{title}</h2>
			<h3>{user}</h3>
		</header>
	)
}

export default Header