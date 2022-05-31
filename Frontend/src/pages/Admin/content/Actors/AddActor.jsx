import React from "react"

const handleDeleteMovie = (actor, username) => {

    fetch('http://127.0.0.1:8000/checkActorExist', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			actor,
		})
	})
	.then(response => response.json())
	.then(result => {
        if (result.exist) return alert(`ERROR: El actor ya existe`)
        console.log(result)
        
        fetch('http://127.0.0.1:8000/addActor', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                actor,
                username,
            })
        })
        .then(response => response.json())
        .then(result => {
            if (!result.success) return alert('No se pudo agregar actor')
            alert('Se agrego actor con exito')
        })
        .catch(error => {
            console.error('Error de conexion intente mas tarde', error)
        })
	})
	.catch(error => {
		console.error('Error de conexion intente mas tarde', error)
	})
}

const DeleteMovie = ({ setMovies, username }) => {

    const [idContent, setIdContent] = React.useState('')

    return (
        <div className="add-content-admin delete-content-admin">
            <header>
                <h3>Agregar Actor</h3>
            </header>
            <form className="delete-movie-form">
                <div className='delete-movie-input f1'>
                    <h4>Ingrese nombre del nuevo Actor</h4>
                    <input 
                        onChange={(event) => setIdContent(event.target.value)}
                        type="text"
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

                        handleDeleteMovie(idContent, username)
                    }}
                >
                    Agregar Actor {idContent}
                </button>
            </form>
        </div>
    )
}

export default DeleteMovie