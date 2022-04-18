import React from "react"

const handleDeleteMovie = (proyect, director) => {

    fetch('http://127.0.0.1:8000/addDirector', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			proyect,
            director,
		})
	})
	.then(response => response.json())
	.then(result => {
        if (result.exist) return alert(`ERROR: El actor ya existe`)
        alert('Se agrego el director con exito')
	})
	.catch(error => {
		console.error('Error de conexion intente mas tarde', error)
	})
}

const DeleteMovie = ({ }) => {

    const [idContent, setIdContent] = React.useState('')
    const [newValue, setNewValue] = React.useState('')

    return (
        <div className="add-content-admin delete-content-admin">
            <header>
                <h3>Agregar Director</h3>
            </header>
            <form className="delete-movie-form">
                <div className='delete-movie-input d1'>
                    <h4>Ingrese id del proyeto donde aparece el nuevo Director</h4>
                    <input 
                        onChange={(event) => setIdContent(event.target.value)}
                        type="number"
                        value={idContent}
                    />
                </div>
                <div className='delete-movie-input d1'>
                    <h4>Ingrese nombre del nuevo Director</h4>
                    <input 
                        onChange={(event) => setNewValue(event.target.value)}
                        type="text"
                        value={newValue}
                    />
                </div>

                <button
                    className="default-button"
                    type='button'
                    onClick={() => {
                        if (idContent == 0  || idContent == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleDeleteMovie(idContent, newValue)
                    }}
                >
                    Agregar Director {newValue}
                </button>
            </form>
        </div>
    )
}

export default DeleteMovie