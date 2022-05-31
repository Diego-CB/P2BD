import React from 'react'
import Header from "../../../components/Header.jsx"
import TextInput_text from "../../../components/TextInpuText.jsx"
import TextInput_num from "../../../components/TextInputNumber.jsx"

const handleSimulacion1 = (n, setListSimulation) => {
	fetch('http://127.0.0.1:8000/sinFecha', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			n,
		})
    })
	.then(response => response.json())
	.then (result => {setListSimulation(result.list)})
	.catch (error => {
		console.error('Error al crear user', error)
		alert('Error de conexion:( intente más tarde')
	})
}


const handleSimulacion2 = (n,d) =>{

    fetch('http://127.0.0.1:8000/conFecha', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			n,
            d,
		})
    })

    .then (response => response.json())
    .then(result =>{
        if(result.success){
            console.log('yas')
            fetch('http://127.0.0.1:8000/mostrar', {
		    headers: {
			    'Content-Type': 'application/json'
		    },
            method: 'POST',
            body: JSON.stringify({
                n,
                d,	
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log('show',result.list)
            })
            .catch (error => {
                console.error('Error al intentar mostrar', error)
                alert('Error de conexion: intente más tarde')
            })
        }
    })

	.catch (error => {
		console.error('Error al cargar data', error)
		alert('Error de conexion:( intente más tarde')
	})

}


const AdminSimulation = ({setAdminShow, username }) =>{
    const [newValue, setNewValue] = React.useState('1')
    const [newValued, setNewValued] = React.useState('01-02-2020')
    const [listSimulation, setListSimulation] = React.useState([])
    const [simulation, setSimulation] = React.useState([])

    console.log(simulation)


    return (
    <div className='content'>
            <Header title='Simulaciones' user={username} />

            <div className='ask'>
                <TextInput_text
                    title='Ingrese una fecha mm-dd-yy'
                    set={setNewValued}
                    className='date-input' />

                <TextInput_num
                    title='Ingrese cantidad de visualizaciones'
                    set={setNewValue}
                    className='vis-input' />

                <button className='btn-genera' onClick={()=>{
                    handleSimulacion2(newValue,newValued,setSimulation)
                }}>Generar</button>

                <button className='btn-SF' onClick={() => { 
                    handleSimulacion1(newValue,setListSimulation)
                } }>Generar S.F</button>
            </div>
            
            <div className='ver-simulacion-admin'>
            <header>
                <h3>Simulaciones</h3>
                <div className="table-simulacion">
                    <div>Usuario</div>
                    <div>Titulo</div>
                    <div>Fecha</div>
                </div>
            </header>

            <ul className="table-simulacion1">
                {listSimulation.map((row, index) => (
                     <li className="row-simulacion"
                        key={index}>

                        <p>{row.usuario}</p>
                        <p>{row.movie}</p>
                        <p>{row.fecha}</p>
                    </li>
                    ))
                } 
            </ul>
        </div>

            
          
        <footer className="admin-footer">
                <button
                    className="default-button nav-button"
                    onClick={() => setAdminShow(0)}
                > Ir a Homepage
                </button>
            </footer>
    </div>
        
    )
}
export default AdminSimulation