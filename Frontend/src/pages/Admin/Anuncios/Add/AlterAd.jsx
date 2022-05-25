import React from "react"

import TextInput from "../../../../components/TextInput.jsx"

const handleAlterAd = (setAds,ad, category, newValue, username) => {
    
    if (category == 'message') {
        newValue = `'${newValue}'`
    }
        
    fetch('http://127.0.0.1:8000/alterAd', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            ad,
            category,
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
    const [ad, setAd] = React.useState('0')
    const [select, setSelect] = React.useState('')
    const [newValue, setNewValue] = React.useState('')

    return (
        <div className="add-content-admin">
            <header>
                <h3>Editar Anuncio</h3>
            </header>
            <form className="alter-movie-form">
                <div className='alter-movie-input f1'>
                    <h4>Ingrese id de anuncio a editar</h4>
                    <input 
                        onChange={(event) => setAd(event.target.value)}
                        type="number"
                        value={ad}
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
                        <option value='announcer_id'>Anunciador "id"</option>
                        <option value='message'>Message</option>
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
                        if (select == '-' || ad == '0'  || newValue == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleAlterAd(setAds, ad, select, newValue, username)
                    }}
                >
                    Editar Anuncio {ad}
                </button>
            </form>
        </div>
    )
}

export default AlterAd