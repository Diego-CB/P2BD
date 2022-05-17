import React from "react"
import Header from '../../../components/Header.jsx'
import HomeAProfile from "./AdminProfile/HomeAProfile.jsx"
import HomeAUser from "./AdminUser/HomeAUser.jsx"
import CreateAdmin from "./AdminUser/CreateAdmin.jsx"
const AdminUsers = ({ setAdminShow, username }) => {

    const [toggleUsers, setToglleUsers] = React.useState(0)

    return (
        <div className = 'content'>
            <Header title='Admin-Users' user={username}/>
            <div className='main-content-admin select-users'>
                {toggleUsers == 0 ? 
                    <div className='user-admin-selection'>
                        <button className="default-button"
                            type='button'
                            onClick={() => setToglleUsers(1)}
                        >
                            Administrar Usuarios 
                        </button>
                        
                        <button className="default-button"
                            type='button'
                            onClick={() => setToglleUsers(2)}
                        >
                            Administrar perfiles 
                        </button>
                        <button className="default-button"
                            type='button'
                            onClick={() => setToglleUsers(3)}
                        >
                            Crear Administradores 
                        </button>
                    </div>

                : (toggleUsers == 1 
                    ? <HomeAUser/>
                    : (toggleUsers == 2 
                        ? <HomeAProfile/> 
                        : <CreateAdmin/>
                    )
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

export default AdminUsers