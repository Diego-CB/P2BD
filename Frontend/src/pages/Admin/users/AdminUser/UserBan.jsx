import React from 'react'
import TextInput from '../../../../components/TextInput.jsx'

const handleDeleteUser = (setUserList, username) => {

    console.log(username)
    fetch('http://127.0.0.1:8000/checkNewUser', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            username,
        })
    })
    .then(response => response.json())
    .then(result => {
        if (!result.userExist) return alert(`ERROR: el usuario ${username} no existe`)
        
        fetch('http://127.0.0.1:8000/deleteUser', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username,
            })
        })
        .then(response => response.json())
        .then(result => {
            if (!result.success) return alert('No se pudo eliminar la pelicula')
            alert('Se elimino el usuario con exito')
            setUserList([])
        })
        .catch(error => {
            console.error('Error de conexion intente mas tarde', error)
        })
    })
    .catch(error => {
        console.error('Error de conexion intente mas tarde', error)
    })
}

const UserBan = ({ setUserList }) => {

    const [username, setUsername] = React.useState('')

    return (
        <div className="add-content-admin delete-content-admin">
            <header>
                <h3>Dar de baja a usuario</h3>
            </header>
            <form className="delete-movie-form delete-user-admin">

                <TextInput 
                    title='Ingrese username de usuario a eliminar' 
                    set={setUsername} 
                    className='delete-movie-input f1'
                /> 

                <button
                    className="default-button"
                    type='button'
                    onClick={() => {
                        if (username == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleDeleteUser(setUserList, username)
                    }}
                >
                    Dar de Baja {username}
                </button>
            </form>
        </div>
    )
}

export default UserBan