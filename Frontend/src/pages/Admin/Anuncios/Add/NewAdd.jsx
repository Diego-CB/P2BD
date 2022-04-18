import React from "react"
import TextInput from '../../../../components/TextInput.jsx'

const handleNewAdd = (announcer, message, setAds) => {
    fetch('http://127.0.0.1:8000/newAdd', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			announcer,
            message
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

const NewAdd = ( {setAds} ) => {

    const [announcer, setAnnouncer] = React.useState('')
    const [message, setMessage] = React.useState('')

    return (
        <div className="add-content-admin add-movie-contaniner">
            <header>
                <h3>Agregar Anuncio</h3>
            </header>
            <form >
                <TextInput set = {setAnnouncer} title='Ingrese id del anunciante' className='add-movie-input'/> 		
                <TextInput set = {setMessage} title='Ingrese mensaje de anunciante' className='add-movie-input'/> 
                <button
                    className="default-button add-movie-button"
                    type='button'
                    onClick={() => {
                        if (announcer == '' || message == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleNewAdd(announcer, message, setAds)
                    }}
                >
                    Agregar Anuncio
                </button>
            </form>
        </div>
    )
}

export default NewAdd