import React from "react"
import Header from '../../../components/Header.jsx'
import AdminSimulation from "./AdminSimula.jsx"
import AdminSimulationSF from "./SinFecha.jsx"


const HomeSimulation = ({ setAdminShow, username }) => {

    const [toggleUsers,setToglleUsers] = React.useState(0)

    return (
        <div className = 'content'>
            <Header title='Simulaciones' user={username}/>
            <div className='main-content-admin select-users'>
                {toggleUsers == 0 ? 
                    <div className='user-admin-selection'>
                        <button className="default-button"
                            type='button'
                            onClick={() => setToglleUsers(1)}
                        >
                            Simular visualizaciones con fecha 
                        </button>
                        
                        <button className="default-button"
                            type='button'
                            onClick={() => setToglleUsers(2)}
                        >
                            Simular visualizaciones sin fecha
                        </button>
                    </div>

                : (toggleUsers == 1 
                    ? <AdminSimulation/>
                    : <AdminSimulationSF/>
                )
            }</div>
            <footer className="admin-footer">
                <button 
                    className="default-button nav-button"
                    onClick={() => setAdminShow(0)}
                >
                    Ir a Homepage
                </button>
            </footer>
        </div>
    )
}

export default HomeSimulation