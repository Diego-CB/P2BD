import React from "react"
import TextInput from '../../../../components/TextInput.jsx'

const handleAddCasting = (id_actor, id_content, username, setCastingList) => {
    
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
        if (result.exist) return alert(`ERROR: el casting ya existe`)

        fetch('http://127.0.0.1:8000/addCasting', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id_content,
                id_actor,
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

const AddCasting = ({ setCastingList, username }) => {

    const [id_actor, setId_actor] = React.useState(0)
    const [id_content, setId_content] = React.useState(0)

    return (
        <div className="user-modify-admin">
            <header>
                <h3>Agregar Casting</h3>
            </header>
            <form className="alter-movie-form">
                <TextInput 
                    title='Ingrese id del actor a agregar' 
                    set={setId_actor} 
                    className='alter-movie-input'
                /> 

                <TextInput 
                    title='Ingrese id del contenido a agregar' 
                    set={setId_content} 
                    className='alter-movie-input'
                /> 	

                <button
                    className="default-button alter-movie-button down"
                    type='button'
                    onClick={() => {
                        if (id_actor == 0  || id_content == 0){
                            return alert('Llene los campos para continuar')
                        }

                        handleAddCasting(id_actor, id_content, username, setCastingList)
                    }}
                >
                    Agregar casting {id_actor} y {id_content}
                </button>
            </form>
        </div>
    )
}

export default AddCasting;