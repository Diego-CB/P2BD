import React from 'react'
import TextInput from '../../../../components/TextInput.jsx'
import MD5 from '../../../../../node_modules/crypto-js/md5.js'


const handleCreateAdmin = (username, email, password) => {
    fetch('http://127.0.0.1:8000/createAdmin', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password: MD5(password).toString(),
        })
    })
    .then(response => response.json())
    .then(result => {
        if (!result.success) return alert('Error al crar Administrador')
        alert('Se Creo el administrador con exito')
    })
    .catch(error => {
        console.error('Error de conexion intente mas tarde', error)
    })
}

const CreateAdmin = () => {
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <div className='main-content-admin content-admin-page create-admin'>
            <div className="user-modify-admin">
                <header>
                    <h3>Crear nuevo Admin</h3>
                </header>
                <form className="alter-movie-form">
                    <TextInput 
                        title='Ingrese nuevo username' 
                        set={setUsername} 
                        className='alter-movie-input'
                    /> 
                    <TextInput 
                        title='Ingrese nuevo email' 
                        set={setEmail} 
                        className='alter-movie-input'
                    /> 
                    <TextInput 
                        title='Ingrese nuevo password' 
                        set={setPassword} 
                        className='alter-movie-input'
                    /> 
                    <button
                        className="default-button alter-movie-button"
                        type='button'
                        onClick={() => {
                            if ([username, email, password].includes('')){
                                return alert('Llene los campos para continuar')
                            }

                            handleCreateAdmin(username, email, password)
                        }}
                    >
                        Crear Nuevo Admin: {username}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateAdmin
