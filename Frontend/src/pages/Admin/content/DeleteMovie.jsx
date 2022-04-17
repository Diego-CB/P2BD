import React from "react"

const handleDeleteMovie = (setMovies,idContent) => {

    fetch('http://127.0.0.1:8000/checkMovieExist', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			idContent,
		})
	})
	.then(response => response.json())
	.then(result => {
        if (!result.movieExist) return alert(`ERROR: la pelicula ${idContent} no existe`)
        
        fetch('http://127.0.0.1:8000/deleteMovie', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                idContent,
            })
        })
        .then(response => response.json())
        .then(result => {
            if (!result.success) return alert('No se pudo eliminar la pelicula')
            alert('Se elimino la pelicula con exito')
            setMovies([])
        })
        .catch(error => {
            console.error('Error de conexion intente mas tarde', error)
        })
	})
	.catch(error => {
		console.error('Error de conexion intente mas tarde', error)
	})
}

const DeleteMovie = ({ setMovies }) => {

    const [idContent, setIdContent] = React.useState(0)

    return (
        <div className="add-content-admin delete-content-admin">
            <header>
                <h3>Eliminar Contenido</h3>
            </header>
            <form className="delete-movie-form">
                <div className='delete-movie-input f1'>
                    <h4>Ingrese id de contenido a eliminar</h4>
                    <input 
                        onChange={(event) => setIdContent(event.target.value)}
                        type="number"
                        value={idContent}
                    />
                </div>

                <button
                    className="default-button"
                    type='button'
                    onClick={() => {
                        if (idContent == 0  || idContent == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleDeleteMovie(setMovies, idContent)
                    }}
                >
                    Eliminar Contenido {idContent}
                </button>
            </form>
        </div>
    )
}

export default DeleteMovie