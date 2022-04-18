import React from 'react'

const handleProfileList = (setProfileList) => {
    fetch('http://127.0.0.1:8000/profileList')
    .then(response => response.json())
    .then(result => {
        if (result.userExist) return alert('No se pudo obtener el listado de usuarios')
        setProfileList(result.list)
    })
    .catch(error => {
        console.error('Error al obtner listado de usuarios', error)
    })
}



const ProfileList = ({ list, setProfileList }) => {

    list.length == 0 && handleProfileList(setProfileList)

    return (
        <div className='list'>
            <header>
                <h3>Listado de Usuarios</h3>
                <div className="table-headers-user">
                    <div>Username</div>
                    <div>id_perfil</div>
                    <div>Perfil</div>
                    <div>Activo</div>
                    <div>Habilitado</div>
                </div>
            </header>
            <ul className="table-content-user">
                {list.map((row, index) => 
                    <li 
                        className="row-content-user"
                        key={index}
                    >
                        <p>{row.username}</p>
                        <p>{row.id_profile}</p>
                        <p>{row.profile}</p>
                        <p>{row.estado ? 'true' : 'false'}</p>
                        <p>{row.habilitado ? 'true' : 'false'}</p>
                    </li>
                )} 
            </ul>
        </div>
    )
}

export default ProfileList