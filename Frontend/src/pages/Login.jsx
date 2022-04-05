import React from "react"

import Header from "../components/Header.jsx"
import TextInput from "../components/TextInput.jsx"

import MD5 from '../../node_modules/crypto-js/md5.js'
import setDocTitle from "../util/docTitle.js";


const handleLogin = (username, password, setIsRegis, setIsLogedIn, setUsername) => {
	fetch('http://127.0.0.1:8000/login', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			username,
			password: MD5(password).toString(),
		})
    })
	.then(response => response.json())
	.then (result => {
		if (!result.userExist) return alert('Usuario no encontrado')
		// alert('Bienvenido!')
		const user = result.username[0].username.toString()
		
		setTimeout(setIsRegis, 2000, false)
		setTimeout(setIsLogedIn, 100, true)
		setTimeout(setUsername, 100, user)

	})
	.catch (error => {
		console.error('Error al intentar loggear', error)
		alert('Error de conexion: intente más tarde')
	})
}

const Login = ({setIsRegis, setIsLogedIn,setUsername}) => {
	setDocTitle('Login')
	const [usernameL, setUsernameL] = React.useState('')
	const [passwordL, setPasswordL] = React.useState('')
	const [isRegistering, setRegistering] = React.useState(false)

	return(
		<div className = 'content'>
			<Header title='Login'/>
			<div className='main-content-login'>
				<form>
					<div className="userInput">
						<TextInput set = {setUsernameL} title='Ingrese Nombre de Usuario' className='userInput'/> 
						<TextInput set = {setPasswordL} title='Ingrese Contraseña' className='userInput' password={true}/> 
					</div>
					<button type='button'  className='button-C'
						onClick ={() => {
							if (usernameL == '' || passwordL == '') {
								return alert('Llene los campos para continuar')
							}
							handleLogin(usernameL, passwordL, setIsRegis, setIsLogedIn, setUsername)
                        }}>Login</button>
					{!isRegistering && <a className="SignIn-op" onClick={()=> setTimeout(setIsRegis, 100, true)}>Sign In</a>}
				</form>
			</div>
		</div>
	)
}

export default Login