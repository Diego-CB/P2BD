import React from 'react'

import TextInput from '../../../../components/TextInput.jsx'

const handleAlterCasting = (setCastingList, id_content, id_actor, category, newValue, username) => {

    fetch('http://127.0.0.1:8000/checkCastingExist', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			id_content,
            id_actor,
		})
	})
	.then(response => response.json())
	.then(result => {
        if (!result.exist) return alert(`ERROR: el casting no existe`)

        fetch('http://127.0.0.1:8000/alterCasting', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id_content,
                id_actor,
                category,
                newValue,
                username,
            })
        })
        .then(response => response.json())
        .then(result => {
            if (!result.success) return alert('No se pudo modificar el casting')
            alert('Se modifico el casting con exito')
            setCastingList([])
        })
        .catch(error => {
            console.error('Error al modificar casting', error)
        })
	})
	.catch(error => {
		console.error('Error al verificar casting', error)
	})
}

const AlterCasting = ({ username, setCastingList }) => {

    const [idActorOld, setIdActorOld] = React.useState(0)
    const [idMovieOld, setIdMovieOld] = React.useState(0)
    const [select, setSelect] = React.useState('')
    const [newValue, setNewValue] = React.useState('')

    return (
        <div className="user-modify-admin">
            <header>
                <h3>Modificar Casting</h3>
            </header>
            <form className="alter-movie-form">
                <TextInput 
                    title='Ingrese id del contenido a editar' 
                    set={setIdActorOld} 
                    className='alter-movie-input'
                /> 

                <TextInput 
                    title='Ingrese id del actor a editar' 
                    set={setIdMovieOld} 
                    className='alter-movie-input'
                /> 

                <div className='alter-movie-input'>
                    <h4>Seleccione campo a editar</h4>
                    <select 
                        onChange={(event) => setSelect(event.target.value)}
                        name="select" 
                        className="genre-select"
                    >
                        <option value='-'>-</option>
                        <option value='id_content'>Id de Película</option>
                        <option value='id_actor'>Id de Actor</option>
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
                        if (select == '-' || idActorOld == ''  || newValue == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleAlterCasting(setCastingList, idActorOld, idMovieOld, select, newValue, username)
                    }}
                >
                    Modificar casting {idActorOld} y {idMovieOld}
                </button>
            </form>
        </div>
    )
}

export default AlterCasting