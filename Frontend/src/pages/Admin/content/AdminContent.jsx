import React from "react"

import Header from "../../../components/Header.jsx"
import MovieList from "./MovieList.jsx"
import AddMovie from "./AddMovie.jsx"
import AlterMovie from "./AlterContent.jsx"
import DeleteMovie from "./DeleteMovie.jsx"
import AddActor from './Actors/AddActor.jsx'
import AlterActor from './Actors/AlterActor.jsx'
import AddDirector from './Actors/AddDirector.jsx'
import AlterDirector from './Actors/AlterDirector.jsx'

const AdminContent = ({ setAdminShow, username }) => {

    const [movies, setMovies] = React.useState([])
    const [toggleActors, setToggleActors] = React.useState(false)


    return (
        <div className = 'content'>
			<Header title='Admin-Contenido' user={username}/>
            {toggleActors 
                ? <div className='main-content-admin content-admin-page'>
                    <AddActor/>
                    <AlterActor/>
                    <AddDirector/>
                    <AlterDirector/>
                </div>
                : <div className='main-content-admin content-admin-page'>
                    <MovieList movies={movies} setMovies={setMovies}/>
                    <AddMovie setMovies={setMovies}/>
                    <AlterMovie setMovies={setMovies}/>
                    <DeleteMovie setMovies={setMovies}/>
                </div>
            }
			
            <footer className="admin-footer">
                <button 
                    className="default-button nav-button"
                    onClick={() => setAdminShow(0)}
                >
                    Ir a Homepage
                </button>
                <button 
                    className="default-button nav-button"
                    onClick={() => setToggleActors(!toggleActors)}
                >
                    Administrar cast/content
                </button>
            </footer>
        </div>
    )
}

export default AdminContent