import React from 'react'
import Header from "../../../components/Header.jsx"
import TextInput from "../../../components/TextInput.jsx"

const AdminSimulation = ({username, setAdminShow }) =>{
    const [newValue, setNewValue] = React.useState('')
    return (
    <div className = 'content'>
        <Header title='Simulaciones' user={username}/>
        
        <div className='ask'>
            <TextInput 
                title='Ingrese una fecha mm-dd-yy' 
                set={setNewValue} 
                className='date-input'
            /> 

            <TextInput 
                title='Ingrese cantidad de visualizaciones' 
                set={setNewValue} 
                className='vis-input'
            /> 
            <button className='btn-genera'>Generar</button>
        </div>
        <div className='show-vis'>
            <header>
                <h3>Simulaciones</h3>
                <div className="table-headers-user">
                    <div>Titulo</div>
                    <div>Usuario</div>
                    <div>Fecha</div>
                </div>
            </header>

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