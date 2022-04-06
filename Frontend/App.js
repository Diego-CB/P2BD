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

const handleRegister = (username, email, password, admin, plan, setIsRegis) => {

    fetch('http://127.0.0.1:8000/checkNewUser', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			username,
		})
	})
	.then(response => response.json())
	.then(result => {
        if (result.userExist) return alert('El usuario ya existe')

        fetch('http://127.0.0.1:8000/register', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password: CryptoJS.MD5(password).toString(),
                admin: admin.toString(),
                plan,
            })
        })
        .then(response => response.json())
        .then(result => {
            if (!result.success) return alert('Error al crear usuario')
            alert('Se creo usuario con exito!!')
			setTimeout(setIsRegis, 2000, false)
        })
        .catch(error => {
            console.error('Failed to sign in', error)
			alert('Error de conexion: intente más tarde')
        })
	})
	.catch(error => {
		console.error('Failed to check for user', error)
		alert('Error de conexion: intente más tarde')
	})
}


const handleLogin = (username, password, setIsRegis, setIsLogedIn, setUsername) => {
	fetch('http://127.0.0.1:8000/login', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			username,
			password: CryptoJS.MD5(password).toString(),
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

const handleProfile = (username,perfil,estado,habilitado) => {
	fetch('http://127.0.0.1:8000/perfiles', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			username,
			perfil,
			estado,
			habilitado
			
		})
    })
	.then(response => response.json())
	.then (result => {
		if (!result.userExist) return alert('No se ha podido crear perfil')
		//console.log(result.username)
		alert('Perfil creado con exito')
		setTimeout(setIsLogedIn, 100, true)

	})
	.catch (error => {
		console.error('Error al crear user', error)
		alert('Error de conexion:( intente más tarde')
	})
}


// -------- Paginas concretas --------

//TODO
const Login = ({setIsRegis, setIsLogedIn,setUsername}) => {
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

const UserPage = ({setIsLogedIn,setUsername}) => {
	const [isRegis, setIsRegis] = React.useState(false)


	return (
		<React.Fragment>

			{isRegis ? <SignIn setIsRegis={setIsRegis}/>: <Login setIsRegis={setIsRegis} setIsLogedIn={setIsLogedIn} setUsername={setUsername}/>}

		</React.Fragment>
	)
}

const SignIn = ({setIsRegis}) => {
	setDocTitle('Registro')

	const [username, setUsername] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [admin, setAdmin] = React.useState(false)
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
							<option value='-1'>-</option>
							<option value='0'>Plan gratis</option>
							<option value='1'>Plan Standar</option>
							<option value='2'>Plan Avanzado</option>
						</select>
					</div>		
					
					<div className = 'adminInput'>
						<label>Usuario Admin: </label>
						<input onChange ={() => setAdmin(!admin)}
						type="checkbox" id="isAdmin"/>
					</div>		

					<button type='button' className='button-C'
						onClick ={() => {
							if (username == '' || email == '' || password == '' || plan == '-1') {
								return alert('Llene los campos para continuar')
							} 
                            handleRegister(username, email, password, admin, plan, setIsRegis)
                        }}>
						Registrar Cuenta</button>
				</form>

			</div>
		</div>
	)
}

const Perfiles = () => {
	setDocTitle('Perfiles')
	const [perfil, setPerfil] = React.useState('')
	const [estado, setEstado] =React.useState(false)
	const [habilitado, setHabilitado] = React.useState(true)
	const [plan, setPlan]= React.useState('')

	const [cuentaList, setCuentalist] = React.useState([{cuenta:""}])


   const AddperfilBtn = ()=>{
	   setCuentalist([...cuentaList,{cuenta:""}])
   }

   const StopAdd =()=>{
	setCuentalist([...cuentaList],"")
	alert("Ya no se pueden añadir más perfiles")
   }
   
   const actualPlan =()=>{
		setPlan()
   }

   return (
	<div className='contenido'>
	   <Header title= "Perfiles"/>        
	   <h1 id="main_title">¿Quien eres?</h1>
	   <div className="content_profile"> 
	   {cuentaList.map((singleAccount, index) =>
			<div key={index} className= "cuentas" >
			<div className="perfil" />
			<div className="info">
				<form>
					<input type="text"  
						   id="input_cuenta" 
						   placeholder="No. Perfil" 
						   onChange={(event) => setPerfil(event.target.value)}/>
						   
				</form>
			</div>
		</div>
	   )}
	   </div>
	  <button type="button" id="btn" onClick={()=> {AddperfilBtn()}}> Añadir perfil </button>
	</div>
	
  )
  }







const App = () => {
	const [isLogedIn, setIsLogedIn] = React.useState(false)
	const [username, setUsername]=React.useState('')
	const [plan, setPlan]= React.useState('')

	return (
		<React.Fragment>
			{isLogedIn ? <Perfiles setUsername={username}/>:<UserPage setIsLogedIn={setIsLogedIn} setUsername={setUsername}/>}
		</React.Fragment>
	)
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
)