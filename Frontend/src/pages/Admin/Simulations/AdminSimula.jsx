import React from 'react'
import Header from "../../../components/Header.jsx"
import TextInput_text from "../../../components/TextInpuText.jsx"
import TextInput_num from "../../../components/TextInputNumber.jsx"


const handleSimulacion2 = (n,d,setSimulation) =>{

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
                console.log('corrio dude')
                setSimulation(result.list)
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
    const [newValue, setNewValue] = React.useState('3')
    const [newValued, setNewValued] = React.useState('01-02-1900')
    const [simulation, setSimulation] = React.useState([])

    return (
    <div className='content'>
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

            </div>
            
            <div className='ver-simulacion-admin'>
            <header>
                <h3>Simulaciones</h3>
                <div className="table-simulacion">
                    <div>User</div>
                    <div>Content</div>
                    <div>Started</div>
                    <div>Finished</div>
                </div>
            </header>

            <ul className="table-simulacion1">
                {simulation.map((row, index) => (
                     <li className="row-simulacion"
                        key={index}>
                        <p>{row.profile}</p>
                        <p>{row.id_content}</p>
                        <p>{row.started}</p>
                        <p>{row.finished}</p>
                    </li>
                    ))
                } 
            </ul>
        </div>
    </div>
        
    )
}
export default AdminSimulation