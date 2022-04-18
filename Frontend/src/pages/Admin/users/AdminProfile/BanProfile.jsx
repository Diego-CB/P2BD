import React from 'react'
import TextInput from '../../../../components/TextInput.jsx'

const handleDeleteProfile = (setProfileList, id_profile) => {

    fetch('http://127.0.0.1:8000/checkProfileExist', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            id_perfil: id_profile,
        })
    })
    .then(response => response.json())
    .then(result => {
        if (!result.exist) return alert(`ERROR: el usuario ${id_profile} no existe`)
        console.log(result)
        
        fetch('http://127.0.0.1:8000/deleteProfile', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id_profile,
            })
        })
        .then(response => response.json())
        .then(result => {
            if (!result.success) return alert('No se pudo eliminar la pelicula')
            alert('Se elimino el usuario con exito')
            setProfileList([])
        })
        .catch(error => {
            console.error('Error de conexion intente mas tarde', error)
        })
    })
    .catch(error => {
        console.error('Error de conexion intente mas tarde', error)
    })
}

const BanProfile = ({ setProfileList }) => {

    const [id_profile, setId_profile] = React.useState('')

    return (
        <div className="add-content-admin delete-content-admin">
            <header>
                <h3>Dar de baja a Perfil</h3>
            </header>
            <form className="delete-movie-form delete-user-admin">

                <TextInput 
                    title='Ingrese id_profile de perfil a eliminar' 
                    set={setId_profile} 
                    className='delete-movie-input f1'
                /> 

                <button
                    className="default-button"
                    type='button'
                    onClick={() => {
                        if (id_profile == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleDeleteProfile(setProfileList, id_profile)
                    }}
                >
                    Dar de Baja {id_profile}
                </button>
            </form>
        </div>
    )
}

export default BanProfile