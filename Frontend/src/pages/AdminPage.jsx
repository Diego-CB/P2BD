import React from 'react'

import Header from '../components/Header.jsx'

import '../styles/adminPage.css'

const AdminPage = ({ username }) => {

    return (
        <div className = 'content'>
			<Header title='Registro' user={username}/>
			<div className='main-content'>
                <div>
                    contenido aca
                </div>
            </div>
        </div>
    )
}

export default AdminPage