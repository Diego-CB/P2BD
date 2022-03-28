/*********************************************
 * Universidad del Valle de Guatemala
 * Sistemas y Tecnologias Web
 * Autores: 
 * 	- Diego Cordova: 20212
 * 	- Paola Contreras: 20213
 * 	- Paola de Leon: 20361
 *
 * app.js
 * - Pagina principal del frontend
 *********************************************/

// -------- Componentes Generales --------

const Header = ({title, user}) => {

	(user === null) ? user = ' ': ''

	return (
		<header>
			<img src="./images/logo.png" alt=""/>
			<h2>{title}</h2>
			<h3>{user}</h3>
		</header>
	)
}

const TextInput = ({className, initValue, title, password, set}) => {
	
	(password == null || password === false) ? password = 'text': password = 'password' 
	
	return (
		<div className={className}>
			<h4>{title}</h4>
			<input onChange={(event) => set(event.target.value)}
			type={password} value={initValue}/> 
		</div>		
	)
}


// -------- Funciones auxiliares --------

const setDocTitle = (newTitle) => {
	document.getElementById('title').textContent = newTitle
}

const handleRegister = (username, email, password, admin, plan) => {
	console.log(username, email, password, admin, plan)
	fetch('http://127.0.0.1:8000/register', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			username,
			email,
			password,
			admin,
			plan,
		})
	})
	.then(response => response.json())
	.then(result => {
		console.log('Sign in succed :D', result)
	})
	.catch(error => {
		console.error('Failed to sign in', error)
	})
}


// -------- Paginas concretas --------

//TODO
const Login = () => {
	return(
		<h1>
			Logiiiiin
		</h1>
	)
}

const UserPage = () => {
	const [username, setUsername] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [isRegis, setIsRegis] = React.useState(false)


	return (
		<React.Fragment>

			{/*isRegis ? <SignIn/>: <Login/>*/}
			<SignIn />

		</React.Fragment>
	)
}

const SignIn = () => {
	setDocTitle('Registro')

	const [username, setUsername] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [admin, setAdmin] = React.useState('false')
	const [plan, setPlan] = React.useState(-1)

	return (
		<div className = 'content'>
			<Header title='Registro'/>
			<div className='main-content'>
				<form >
					<TextInput set = {setEmail} title='Ingrese Correo' className='userInput'/> 
					<TextInput set = {setUsername} title='Ingrese Nombre de Usuario' className='userInput'/> 
					<TextInput set = {setPassword} title='Ingrese Contraseña' className='userInput' password={true}/> 
					<div className='userInput'>
						<h4>Seleccione Plan</h4>
						<select 
						onChange={(event) => setPlan(event.target.value)}
						name="select" className="plan-select">
							<option value="">-</option>
							<option value='0'>Plan gratis</option>
							<option value='1'>Plan Standar</option>
							<option value='2'>Plan Avanzado</option>
						</select>
					</div>		
					
					<div className = 'adminInput'>
						<label>Usuario Admin: </label>
						<input onChange ={(event) => setAdmin(event.target.value)}
						type="checkbox" id="isAdmin"/>
					</div>		

					<button type='button' 
						onClick ={() => handleRegister(username, email, password, admin, plan)}>
						Registrar Cuenta</button>
				</form>

			</div>
		</div>
	)
}

const App = () => {

	const user = {}

	if(user.isLogedIn){
		// TODO return homepage
	}

	return (
		<UserPage/>
	)
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
)