import React from 'react'

import TextInput from '../../../../components/TextInput.jsx'

const handleAlterProfile = (setProfileList, id_perfil, category, newValue) => {

    if (category == 'profile') {
        newValue = `'${newValue}'`
    }

    fetch('http://127.0.0.1:8000/checkProfileExist', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			id_perfil,
		})
	})
	.then(response => response.json())
	.then(result => {
        if (!result.exist) return alert(`ERROR: el perfil  ${id_perfil} no existe`)

        fetch('http://127.0.0.1:8000/alterProfile', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id_perfil,
                category,
                newValue,
            })
        })
        .then(response => response.json())
        .then(result => {
            if (!result.success) return alert('No se pudo modificar usuario')
            alert('Se modifico el usuario con exito')
            setProfileList([])
        })
        .catch(error => {
            console.error('Error al agregar peliculas', error)
        })
	})
	.catch(error => {
		console.error('Error al modificar usuario', error)
	})
}

const AlterProfile = ({ setProfileList }) => {

    const [id_perfil, setId_perfil] = React.useState('')
    const [select, setSelect] = React.useState('')
    const [newValue, setNewValue] = React.useState('')

    return (
        <div className="user-modify-admin">
            <header>
                <h3>Modificar Perfiles</h3>
            </header>
            <form className="alter-movie-form">
                <TextInput 
                    title='Ingrese id_perfil del perfil a editar' 
                    set={setId_perfil} 
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
                        <option value='profile'>Nombre de Perfil</option>
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
                        if (select == '-' || id_perfil == ''  || newValue == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleAlterProfile(setProfileList, id_perfil, select, newValue)
                    }}
                >
                    Modificar perfil {id_perfil}
                </button>
            </form>
        </div>
    )
}

export default AlterProfile