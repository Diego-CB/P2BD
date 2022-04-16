import React from "react"
import TextInput from "../../../components/TextInput.jsx"

const handleAddMovie = (title, category, genre, releaseDate, link, duration) => {
    fetch('http://127.0.0.1:8000/addMovie', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			title,
            category,
            genre,
            releaseDate,
            link,
            duration,
		})
	})
	.then(response => response.json())
	.then(result => {
        if (!result.success) return alert('No se pudo agregar la pelicula')
        console.log('Se agrego la pelicula con exito')
	})
	.catch(error => {
		console.error('Error al agregar peliculas', error)
	})
}

const AddMovie = () => {

    const [title, setTitle] = React.useState('')
    const [category, setCategory] = React.useState(false)
    const [genre, setGenre] = React.useState('')
    const [releaseDate, setReleaseDate] = React.useState('')
    const [link, setLink] = React.useState('')
    const [duration, setDuration] = React.useState(0)

    return (
        <div className="add-content-admin">
            <header>
                <h3>Agregar Pelicula</h3>
            </header>
            <form >
                <TextInput set = {setTitle} title='Ingrese el Titulo' className='add-movie-input'/> 
                <div className = 'categoryInput'>
                    <label>Es Pelicula: </label>
                    <input onChange ={() => setCategory(!category)}
                    type="checkbox" id="ismovie"/>
                </div>		
                <div className='add-movie-input'>
                    <h4>Seleccione genero</h4>
                    <select 
                    onChange={(event) => setGenre(event.target.value)}
                    name="select" className="genre-select">
                        <option value='Comedia'>-</option>
                        <option value='Comedia'>Comedia</option>
                        <option value='Romance'>Romance</option>
                        <option value='Infantil'>Infantil</option>
                        <option value='Drama'>Drama</option>
                        <option value='Terror'>Terror</option>
                        <option value='Accion'>Accion</option>
                    </select>
				</div>		
                <TextInput set = {setReleaseDate} title='Ingrese fecha dd-mm-yyyy' className='add-movie-input'/> 
                <TextInput set = {setLink} title='Ingrese Link' className='add-movie-input'/> 
                <TextInput set = {setDuration} title='Ingrese duracion' className='add-movie-input'/> 
                <button
                    className="default-button add-movie-button"
                    onClick={() => {
                        if (title == '' || genre == '' || releaseDate == '' || link == '' || duration == 0){
                            return alert('Llene los campos para continuar')
                        }

                        handleAddMovie(title, category, genre, releaseDate, link, duration)
                    }}
                >
                    Agregar Pelicula
                </button>
            </form>
        </div>
    )
}

export default AddMovie