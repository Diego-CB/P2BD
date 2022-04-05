import React from "react";
import Header from "../components/Header.jsx";

import setDocTitle from "../util/docTitle.js";

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
	
)}

export default Perfiles