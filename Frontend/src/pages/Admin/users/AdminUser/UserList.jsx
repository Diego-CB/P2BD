import React from 'react'

const handleUserList = (setUserList) => {
    fetch('http://127.0.0.1:8000/userList')
	.then(response => response.json())
	.then(result => {
        if (result.userExist) return alert('No se pudo obtener el listado de usuarios')
        setUserList(result.list)
	})
	.catch(error => {
		console.error('Error al obtner listado de usuarios', error)
	})
}


const UserList = ({ userList, setUserList }) => {

    userList.length == 0 && handleUserList(setUserList)

    return (
        <div className='list'>
            <header>
                <h3>Listado de Usuarios</h3>
                <div className="table-headers-user">
                    <div>Username</div>
                    <div>Email</div>
                    <div>Plan</div>
                    <div>Es Administrador</div>
                    <div>Habilitado</div>
                </div>
            </header>
            <ul className="table-content-user">
                {userList.map((row, index) => 
                    <li 
                        className="row-content-user"
                        key={index}
                    >
                        <p>{row.username}</p>
                        <p>{row.email}</p>
                        <p>{row.plan}</p>
                        <p>{row.administrador ? 'true' : 'false'}</p>
                        <p>{row.habilitado ? 'true' : 'false'}</p>
                    </li>
                )} 
            </ul>
        </div>
    )
}

export default UserList