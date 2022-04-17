import React from "react"

const handleMovieList = (setMovies) => {
    fetch('http://127.0.0.1:8000/movieList')
	.then(response => response.json())
	.then(result => {
        if (result.userExist) return alert('No se pudo obtener el listado de peliculas')
        setMovies(result.list)
	})
	.catch(error => {
		console.error('Error al obtner listado de peliculas', error)
	})
}

const MovieList = ({ movies, setMovies }) => {

    movies.length == 0 && handleMovieList(setMovies)

    return (
        <div className="ver-content-admin">
            <header>
                <h3>Listado de Peliculas</h3>
                <div className="table-headers">
                    <div>Id</div>
                    <div>Title</div>
                    <div>Genre</div>
                    <div>release date</div>
                </div>
            </header>
            <ul className="table-content">
                {movies.map((row, index) => 
                    <li 
                        className="row-content"
                        key={index}
                    >
                        <p>{row.id_content}</p>
                        <p>{row.title}</p>
                        <p>{row.genre}</p>
                        <p>{row.release_date}</p>
                    </li>
                )} 
            </ul>
        </div>
    )
}

export default MovieList