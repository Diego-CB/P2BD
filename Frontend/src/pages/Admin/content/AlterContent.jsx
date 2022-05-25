import React from "react"
import TextInput from "../../../components/TextInput.jsx"

const handleAlterMovie = (setMovies,idContent, category, newValue, username) => {
    if (!['category', 'min_duration'].includes(category)) {
        newValue = `'${newValue}'`
    }

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
        
        fetch('http://127.0.0.1:8000/alterMovie', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                idContent,
                category,
                newValue,
                username,
            })
        })
        .then(response => response.json())
        .then(result => {
            if (!result.success) return alert('No se pudo agregar la pelicula')
            alert('Se modifico la pelicula con exito')
            setMovies([])
        })
        .catch(error => {
            console.error('Error al agregar peliculas', error)
        })
	})
	.catch(error => {
		console.error('Error al agregar peliculas', error)
	})
}

const AlterMovie = ({ setMovies, username }) => {

    const [idContent, setIdContent] = React.useState(0)
    const [select, setSelect] = React.useState('')
    const [newValue, setNewValue] = React.useState('')

    return (
        <div className="add-content-admin">
            <header>
                <h3>Editar Contenido</h3>
            </header>
            <form className="alter-movie-form">
                <div className='alter-movie-input f1'>
                    <h4>Ingrese id de contenido a editar</h4>
                    <input 
                        onChange={(event) => setIdContent(event.target.value)}
                        type="number"
                        value={idContent}
                    />
                </div>

                <div className='alter-movie-input'>
                    <h4>Seleccione campo a editar</h4>
                    <select 
                        onChange={(event) => setSelect(event.target.value)}
                        name="select" 
                        className="genre-select"
                    >
                        <option value='-'>-</option>
                        <option value='title'>Titulo</option>
                        <option value='category'>Categoria</option>
                        <option value='genre'>Genero</option>
                        <option value='release_date'>Fecha de lanzamiento</option>
                        <option value='link'>Link</option>
                        <option value='min_duration'>Duracion</option>
                    </select>
				</div>		

                <TextInput 
                    title='Ingrese nuevo valor' 
                    set={setNewValue} 
                    className='alter-movie-input'
                /> 

                <button
                    className="default-button alter-movie-button"
                    type='button'
                    onClick={() => {
                        if (select == '' || idContent == 0  || newValue == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleAlterMovie(setMovies, idContent, select, newValue, username)
                    }}
                >
                    Editar Contenido {idContent}
                </button>
            </form>
        </div>
    )
}

export default AlterMovie