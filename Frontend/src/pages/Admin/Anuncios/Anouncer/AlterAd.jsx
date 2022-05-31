import React from "react"

import TextInput from "../../../../components/TextInput.jsx"

const handleAlterAd = (setAds,announcer, newValue, username) => {
    
    fetch('http://127.0.0.1:8000/alterAnnouncer', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            announcer,
            newValue,
            username,
        })
    })
    .then(response => response.json())
    .then(result => {
        if (!result.success) return alert('No se pudo modificar el anuncio')
        alert('Se modifico el anuncio con exito')
        setAds([])
    })
    .catch(error => {
        console.error('Error al modificar el anuncio', error)
    })
}


const AlterAd = ( {setAds, username} ) => {
    const [announcer, setAnnouncer] = React.useState('')
    const [newValue, setNewValue] = React.useState('')

    return (
        <div className="add-content-admin">
            <header>
                <h3>Editar Anuncio</h3>
            </header>
            <form className="alter-movie-form">
                <div className='alter-movie-input f1'>
                    <h4>Ingrese id de anunciante a editar</h4>
                    <input 
                        onChange={(event) => setAnnouncer(event.target.value)}
                        type="number"
                        value={announcer}
                    />
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
                        if ( announcer == ''  || newValue == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleAlterAd(setAds, announcer, newValue, username)
                    }}
                >
                    Editar Anunciante {announcer}
                </button>
            </form>
        </div>
    )
}

export default AlterAd