import React from "react";
import Header from "../components/Header.jsx";

import setDocTitle from "../util/docTitle.js";

const handleProfile = (perfil,estado,habilitado) => {
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

const handlePlan = (username, setPlan) => {
	fetch('http://127.0.0.1:8000/checkplan', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			username,
		})
    })
	.then(response => response.json())
	.then (result => {
		if (!result.userExist) return alert('No se ha podido crear perfil aquiiiii')
		const profile_plan = result.username[0].plan.toString()
		// console.log('Plannnn ' ,profile_plan)
		setTimeout(setPlan, 100, profile_plan)
	})
	.catch (error => {
		console.error('Error al crear user', error)
		alert('Error de conexion:( intente más tarde')
	})
}


const Perfiles = ({Username}) => {
	setDocTitle('Perfiles')
	const [perfil, setPerfil] = React.useState('')
	const [estado, setEstado] =React.useState(false)
	const [habilitado, setHabilitado] = React.useState(true)
	const [plan, setPlan]= React.useState(1)
	const [count, setCount]=React.useState(1)

	const [cuentaList, setCuentalist] = React.useState([{cuenta:""}])
	//handlePlan({Username})
	//const check = 
	handlePlan(Username, setPlan)
	console.log(plan)
	
	const AddperfilBtn = ()=>{
		setCuentalist([...cuentaList,{cuenta:""}]) 
		setCount((count+1))
		//console.log(count)
		if(plan === '0'){
			if (count >=1){
				StopAdd()
				alert("Unicamente dispones de un perfil por tener la cuenta gratuita")
		}
		}
		if(plan==='1'){
			if(count >= 4){
				//alert("max estandar")
				StopAdd()
			}
		}
		if(plan === '2'){
		if (count >= 8 ){
				StopAdd()
			} 
		}
	}

	const StopAdd =()=>{
		setCuentalist([...cuentaList],"")
		alert("Ya no se pueden añadir más perfiles")
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