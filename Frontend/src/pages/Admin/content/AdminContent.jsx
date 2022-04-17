import React from "react"

import Header from "../../../components/Header.jsx"
import MovieList from "./MovieList.jsx"
import AddMovie from "./AddMovie.jsx"
import AlterMovie from "./AlterContent.jsx"
import DeleteMovie from "./DeleteMovie.jsx"

const AdminContent = ({ setAdminShow, username }) => {

    const [movies, setMovies] = React.useState([])
    const retunToSelect = () => setAdminShow(0)

    return (
        <div className = 'content'>
			<Header title='Admin-Contenido' user={username}/>
			<div className='main-content-admin content-admin-page'>
                <MovieList movies={movies} setMovies={setMovies}/>
                <AddMovie setMovies={setMovies}/>
                <AlterMovie setMovies={setMovies}/>
                <DeleteMovie setMovies={setMovies}/>
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