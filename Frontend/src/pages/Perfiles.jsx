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
		//console.log('helo',username,profile)
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
	.then (result => {
		//console.log(plan)
		if (!result.success) return alert('No se ha podido cambiar plan')
		alert('Cambio realizado con exito')
	})
	.catch (error => {
		console.error('Error al cambiar plan', error)
		alert('Error de conexion:( intente más tarde')
	})
}

const handleUser_Profiles = (username, setProfile ) => {
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
        //console.log(result)
		//if (!result.userExist) return alert('Error al cargar perfiles disponibles')
		const profiles_user = result.username
		let profiles = []
		profiles_user.map((profile)=>{
			profiles.push(profile.profile)
		})
		//console.log('Array: ', profiles)
		setProfile(profiles)
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
	const [disableProfile_plan, setDisableprofile_plan] = React.useState(false);
	
	//console.log('plan',plan)
	//console.log('up',Uplan)
	//console.log('profile',profile)
	//console.log("conteo",count)
	//console.log(disable, "estado")

	let size = profile.length

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
                if (count >=3 ){
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
		
		const delprofile =profile.filter((element,index) =>{
			return index == ind;
			
        })

		setDisableProfile(delprofile.toString())

		const updateProfile =profile.filter((element,index) =>{
			return index !== ind;
			
        })

        setProfile(updateProfile);
		setDisableProfile('')
    }



	React.useEffect(() =>{
		handlePlan(Username, setPlan);
		handleUser_Profiles(Username,setProfile)
	 },[])

	 React.useEffect(() =>{
		if(plan === "0" && size >= 1){
			setDisable(true)
			setDisableText(true)
		} else if (plan ==="1" && size >= 4) {
			setDisable(true)
			setDisableText(true)
		} else if( plan==='2' && size ===8){
			setDisable(true)
			setDisableText(true)
		}else{
			setDisable(false)
			setDisableText(false)
		}
		//console.log('ADDDD',plan )
	},[plan, size])

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
                            onClick={()=> {
										if (nameProfile == '') return alert('Ingrese nombre para crear un nuevo perfil')
										AddProfile(),
										handleProfile(Username, nameProfile)}}
                    > + </button>
                </div>

				<div className= "removed-profile">
					 <input id="delete-input"
                            type="text" 
                            placeholder="Perfil a eliminar ..." 
                            value={disableProfile} 
                            onChange={(event) => setDisableProfile(event.target.value)}>
                    </input>
				</div>

                <div className="show-profiles">

                    {profile.map((element,index) => {
                        return(
                            <div className= "show-each-profile" key={index}>
                                <button id="name-use"
										title='Go to content'
								>{element}</button>
                                <button id="btn-remove" 
                                        title='Remove Profile'
                                        onClick={() => {
											if (disableProfile == '') return alert('Ingrese nombre para eliminar un perfil')
											RemoveProfile(index),
											handleDelete_Profile(Username, disableProfile)}}> 
								- </button>   
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
						handleUpdate(Username,Uplan)
						setPlan(Uplan)
						}}
					> Done </button>
						
               </div>
            </div>   
          </div>  
       
     )
}


export default Perfiles