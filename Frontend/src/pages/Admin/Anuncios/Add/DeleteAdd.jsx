import React from "react"

const handleDeleteAdd = (setAds, ad) => {

    fetch('http://127.0.0.1:8000/deleteAdd', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            ad,
        })
    })
    .then(response => response.json())
    .then(result => {
        if (!result.success) return alert('No se pudo eliminar el anuncio')
        alert('Se elimino el anuncio')
        setAds([])
    })
    .catch(error => {
        console.error('Error de conexion intente mas tarde', error)
    })
}

const DeleteAdd = ({ setAds }) => {

    const [ad, setAd] = React.useState('0')

    return (
        <div className="add-content-admin delete-content-admin">
            <header>
                <h3>Eliminar Anuncio</h3>
            </header>
            <form className="delete-movie-form">
                <div className='delete-movie-input f1'>
                    <h4>Ingrese id del anuncio a eliminar</h4>
                    <input 
                        onChange={(event) => setAd(event.target.value)}
                        type="number"
                        value={ad}
                    />
                </div>

                <button
                    className="default-button"
                    type='button'
                    onClick={() => {
                        if (ad == '0'){
                            return alert('Llene los campos para continuar')
                        }

                        handleDeleteAdd(setAds, ad)
                    }}
                >
                    Eliminar Anuncio {ad}
                </button>
            </form>
        </div>
    )
}

export default DeleteAdd