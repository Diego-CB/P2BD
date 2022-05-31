import React from "react"
import TextInput from "../../../../components/TextInput.jsx"

const handleAlterMovie = (actor, newValue, username) => {

    fetch('http://127.0.0.1:8000/alterActor', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            actor,
            newValue,
            username,
        })
    })
    .then(response => response.json())
    .then(result => {
        if (!result.success) return alert('No se pudo modificar el actor')
        alert('Se modifico el actor con exito')
    })
    .catch(error => {
        console.error('Error al agregar peliculas', error)
    })
}

const AlterMovie = ({ username }) => {

    const [idContent, setIdContent] = React.useState(0)
    const [newValue, setNewValue] = React.useState('')

    return (
        <div className="add-content-admin">
            <header>
                <h3>Editar Actor</h3>
            </header>
            <form className="alter-movie-form">
                <div className='alter-movie-input f1'>
                    <h4>Ingrese id de actor a editar</h4>
                    <input 
                        onChange={(event) => setIdContent(event.target.value)}
                        type="number"
                        value={idContent}
                    />
                </div>

                <TextInput 
                    title='Ingrese nuevo nombre del actor' 
                    set={setNewValue} 
                    className='alter-movie-input'
                /> 

                <button
                    className="default-button alter-movie-button"
                    type='button'
                    onClick={() => {
                        if (idContent == 0  || newValue == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleAlterMovie(idContent, newValue, username)
                    }}
                >
                    Editar Actor {idContent}
                </button>
            </form>
        </div>
    )
}

export default AlterMovie