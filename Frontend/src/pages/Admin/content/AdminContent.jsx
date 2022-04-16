import React from "react"

import Header from "../../../components/Header.jsx"
import MovieList from "./MovieList.jsx"
import AddMovie from "./AddMovie.jsx"

const AdminContent = ({ setAdminShow, username }) => {

    const retunToSelect = () => setAdminShow(0)

    return (
        <div className = 'content'>
			<Header title='Admin-Contenido' user={username}/>
			<div className='main-content-admin content-admin-page'>
                <MovieList/>
                <AddMovie/>
                <div className="change-content-admin">change</div>
                <div className="delete-content-admin">delete</div>
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