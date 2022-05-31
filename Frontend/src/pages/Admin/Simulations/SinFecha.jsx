import React from 'react'
import Header from "../../../components/Header.jsx"
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



const AdminSimulationSF = ({setAdminShow, username }) =>{
    const [newValue, setNewValue] = React.useState('1')
    const [listSimulation, setListSimulation] = React.useState([])


    return (
    <div className='content'>
            <div className='ask'>

                <TextInput_num
                    title='Ingrese cantidad de visualizaciones'
                    set={setNewValue}
                    className='vis-input' />

                <button className='btn-SF' onClick={() => { 
                    handleSimulacion1(newValue,setListSimulation)
                } }>Generar</button>
            </div>
            
            <div className='ver-simulacion-admin1'>
            <header>
                <h3>Simulaciones</h3>
                <div className="table-simulacion1">
                    <div>Usuario</div>
                    <div>Titulo</div>
                    <div>Fecha</div>
                </div>
            </header>

            <ul className="table-simulacion2">
                {listSimulation.map((row, index) => (
                     <li className="row-simulacion1"
                        key={index}>

                        <p>{row.usuario}</p>
                        <p>{row.movie}</p>
                        <p>{row.fecha}</p>
                    </li>
                    ))
                } 
            </ul>
        </div>

    </div>
        
    )
}
export default AdminSimulationSF
