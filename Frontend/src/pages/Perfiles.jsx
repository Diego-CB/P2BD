import React from "react";
import Header from "../components/Header.jsx";
import personas from '../images/persona.png'
import setDocTitle from "../util/docTitle.js";

import '../styles/profiles.css'

const handleProfile = (username,profile) => {
	fetch('http://127.0.0.1:8000/profiles', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			username,
			profile,	
		})
    })
	.then(response => response.json())
	.then (result => {
		if (!result.success) return alert('No se ha podido crear perfil')
		//console.log(result.username)
		alert('Perfil creado con exito')

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
        //console.log(result)
		if (!result.userExist) return alert('No se ha podido crear perfil')
		const profile_plan = result.username[0].plan.toString()
		// console.log('Plannnn ' ,profile_plan)
		setPlan(profile_plan)
	})
	.catch (error => {
		console.error('Error al crear user', error)
		alert('Error de conexion:( intente más tarde')
	})
}
const handleDelete_Profile = (username,profile) => {
	fetch('http://127.0.0.1:8000/deleteprofiles', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			username,
			profile,
		})
    })
	.then(response => response.json())
	.then (result => {
		if (!result.success) return alert('No se ha podido eliminar perfil')
		//console.log(result.username)
		alert('Perfil eliminado con exito')
	})
	.catch (error => {
		console.error('Error al eliminar perfil', error)
		alert('Error de conexion:( intente más tarde')
	})
}

const handleUpdate = (username,plan) => {
	fetch('http://127.0.0.1:8000/upgrade', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			username,
			plan,
		})
    })
	.then(response => response.json())
	.then (result => {console.log(plan)
		if (!result.success) return alert('No se ha podido cambiar plan')
		alert('Cambio realizado con exito')
	})
	.catch (error => {
		console.error('Error al cambiar plan', error)
		alert('Error de conexion:( intente más tarde')
	})
}

const handleProfiles = (username,setProfile ) => {
	fetch('http://127.0.0.1:8000/checkprofiles', {
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
		if (!result.userExist) return alert('No se ha podido crear perfil')
		//const profile_user = result.username[0].profile.toString()
		//console.log('Plannnn ' ,profile_user)
		console.log(result.username)
		setTimeout(setProfile, 100, profile_plan)
	})
	.catch (error => {
		console.error('Error al crear user', error)
		alert('Error de conexion:( intente más tarde')
	})
}


const Perfiles = ({Username}) => {
	setDocTitle('Perfiles')
    const [plan, setPlan]= React.useState(1);
	const [count, setCount]=React.useState(0);
	const [Uplan, setUplan]= React.useState(-1);
    const [profile, setProfile] = React.useState([]);
	const [disable, setDisable] = React.useState(false);
	const [nameProfile, setNameprofile] = React.useState('');
	const [disabletext, setDisableText] = React.useState(false);
	const [disableProfile, setDisableProfile]= React.useState('');

	handlePlan(Username, setPlan)
	console.log(plan)
	//console.log("conteo",count)
	//console.log(disable, "estado")

	 
    const AddProfile = () =>{
        if(!nameProfile){
            alert('Ingrese un nombre para el nuevo perfil')
        }else{
            setProfile([...profile, nameProfile]);
            setNameprofile('');  
			setCount((count+1));
            if(plan === '0'){
                 if (count >=0){
                    StopAdd();
                }   
            }
            if(plan === '1'){
                if (count >=3){
                  StopAdd();
               }
           }
           if(plan === '2'){
                if (count >=7){
                    StopAdd();
                }
            }
        }

    }

	const StopAdd =()=>{
		setDisable(true)
		setDisableText(true)
		alert("Este es el último perfil disponible")
	}

    const RemoveProfile = (ind) =>{
		setCount((count-1));
        setDisable(false);
		setDisableText(false);

		const updateProfile =profile.filter((element,index) =>{
			setDisableProfile(element)
			return index !== ind;
			
        })
        setProfile(updateProfile);
    }
     return (
          <div className='main-div'>
            <Header title= "Perfiles" user={Username}/>  
            <div className='child-div'>
                <div className="child-one">
                    <img src={personas} alt="person-logo" id="icon-person"/>
                    <h2 id="who-watching">¿Quien eres?</h2>
                </div>
                <div className="add-profile">
                    <input id="profile-input"
                            type="text" 
                            placeholder="Añadir nuevo perfil ..." 
                            value={nameProfile} 
							disabled={disabletext}
                            onChange={(event) => setNameprofile(event.target.value)}>
                    </input>
                    <button id="btn-add" 
                            title='Add Profile'
							disabled={disable}
                            onClick={()=> {AddProfile(),handleProfile(Username, nameProfile)}}
                            
                    > + </button>
                </div>
                <div className="show-profiles">
                    {profile.map((element,index) => {
                        return(
                            <div className= "show-each-profile" key={index}>
                                <h4 id="name-use">{element}</h4>
                                <button id="btn-remove" 
                                        title='Remove Profile'
                                        onClick={() => {RemoveProfile(index),handleDelete_Profile(Username, disableProfile)}}> - </button>   
                            </div>
                        )
                    })}
                    
                </div>
               <div className="change-plan">
                   <select 
						onChange={(event) => setUplan(event.target.value)}
						name="select" className="upgrade">
							<option value='-1'>Cambiar plan</option>
							<option value='0'>Plan gratis</option>
							<option value='1'>Plan Standar</option>
							<option value='2'>Plan Avanzado</option>
					</select>
					<button id= 'btn-changePlan' onClick={()=> {
						if(Uplan=== '-1' || Uplan == -1) return alert('No se ha realizado un cabio en el plan')
						handleUpdate(Username,Uplan)}}> Done </button>
               </div>
            </div>   
          </div>  
       
     )
   }


export default Perfiles