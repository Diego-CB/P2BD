import React from "react"

import Header from "../../components/Header.jsx"

const AdminContent = ({ setAdminShow, username }) => {

    const retunToSelect = () => setAdminShow(0)

    return (
        <div className = 'content'>
			<Header title='Admin-Contenido' user={username}/>
			<div className='main-content-admin'>
                <h2>aca va el content</h2>
            </div>
            <footer className="admin-footer">
                <button 
                    className="default-button nav-button"
                    onClick={retunToSelect}
                >
                    Ir a Homepage
                </button>
            </footer>
        </div>
    )
}

export default AdminContent