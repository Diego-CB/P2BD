import React from "react"
import TextInput from '../../../../components/TextInput.jsx'

const handleNewAdd = (announcer, setAds, username) => {
    fetch('http://127.0.0.1:8000/newAnnouncer', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			announcer,
            username,
		})
	})
	.then(response => response.json())
	.then(result => {
        if (!result.success) return alert('No se pudo agregar el anuncio')
        alert('Se agrego el anuncio con exito')
        setAds([])
	})
	.catch(error => {
		console.error('Error al agregar anuncio', error)
	})
}

const NewAdd = ( {setAds, username} ) => {

    const [announcer, setAnnouncer] = React.useState('')

    return (
        <div className="add-content-admin add-movie-contaniner">
            <header>
                <h3>Agregar Anunciante</h3>
            </header>
            <form >
                <TextInput set = {setAnnouncer} title='Ingrese nombre del nuevo anunciante' className='add-movie-input'/> 		
                <button
                    className="default-button add-movie-button"
                    type='button'
                    onClick={() => {
                        if (announcer == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleNewAdd(announcer, setAds, username)
                    }}
                >
                    Agregar Anunciante
                </button>
            </form>
        </div>
    )
}

export default NewAdd