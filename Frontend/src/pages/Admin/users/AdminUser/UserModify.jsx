import React from 'react'

import TextInput from '../../../../components/TextInput.jsx'

const handleAlterUser = (setUserList, username, category, newValue) => {

    if (category == 'email') {
        newValue = `'${newValue}'`
    }

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
        if (!result.userExist) return alert(`ERROR: el usuario  ${username} no existe`)

        fetch('http://127.0.0.1:8000/alterUser', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username,
                category,
                newValue,
            })
        })
        .then(response => response.json())
        .then(result => {
            if (!result.success) return alert('No se pudo modificar usuario')
            alert('Se modifico el usuario con exito')
            setUserList([])
        })
        .catch(error => {
            console.error('Error al agregar peliculas', error)
        })
	})
	.catch(error => {
		console.error('Error al modificar usuario', error)
	})
}

const UserModify = ({ setUserList }) => {

    const [username, setUsername] = React.useState('')
    const [select, setSelect] = React.useState('')
    const [newValue, setNewValue] = React.useState('')

    return (
        <div className="user-modify-admin">
            <header>
                <h3>Modificar Usuarios</h3>
            </header>
            <form className="alter-movie-form">
                <TextInput 
                    title='Ingrese username de usuario a editar' 
                    set={setUsername} 
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
                        <option value='email'>Email</option>
                        <option value='plan'>Plan</option>
                        <option value='administrador'>Es Admin</option>
                        <option value='habilitado'>Esta Habilitado</option>
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
                        if (select == '-' || username == ''  || newValue == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleAlterUser(setUserList, username, select, newValue)
                    }}
                >
                    Modificar Usuario {username}
                </button>
            </form>
        </div>
    )
}

export default UserModify