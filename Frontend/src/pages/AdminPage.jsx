import React from 'react'

import '../styles/adminPage.css'

const getSpecs = (type) => {
    if (type === 'Contenido') return ['Agregar contenido', 'Modificar contenido']
    if (type === 'Usuarios') return ['Modificar usuarios', 'Dar de baja usuarios']

    if (type === 'Anuncios') return [
        'Agregar anunciantes', 
        'Modificar anunciantes', 
        'Agregar anuncios', 
        'Modificar anuncios',
        'Eliminar anuncios'
    ]

    if (type === 'Reporteria') return [
        'Top 10 de generos mas vistos',
        'Reproducciones por categoria',
        'Top 10 de directores y actores',
        'Numero de cuentas avanzadas',
        'Hora pico de servicio'
    ]
}

const getAdminPath = (type) => {
    if (type === 'Contenido') return 1
    if (type === 'Usuarios') return 2
    if (type === 'Anuncios') return 3
    if (type === 'Reporteria') return 4
}

const AdminOption = ({ title, setAdminShow }) => {

    const specs = getSpecs(title)
    const adminPath = getAdminPath(title)

    return (
        <div className='admin-option'>
            <div className='option-info'>
                <h3>{title}</h3>
                <div className='specs'>
                    <ul>
                        {specs.map((spec, index) => {
                            return <li key={index}>{spec}</li>
                        })}
                    </ul>
                </div>
                <button
                    className='default-button'
                    onClick={() => setAdminShow(adminPath)}
                >Editar {title}</button>
            </div>
        </div>
    )
}

import Header from '../components/Header.jsx'
import setDocTitle from '../util/docTitle.js' 
import AdminAdds from './Admin/Anuncios/AdminAdds.jsx'
import AdminContent from './Admin/content/AdminContent.jsx'
import AdminUsers from './Admin/users/AdminUsers.jsx'
import AdminReports from './Admin/Reports/AdminReports.jsx'

const AdminPage = ({ username }) => {
    setDocTitle('Admin')

    const [amdinShow, setAdminShow] = React.useState(0)

    if (amdinShow === 1) return <AdminContent setAdminShow={setAdminShow} username={username}/>
    if (amdinShow === 2) return <AdminUsers   setAdminShow={setAdminShow} username={username}/>
    if (amdinShow === 3) return <AdminAdds    setAdminShow={setAdminShow} username={username}/>
    if (amdinShow === 4) return <AdminReports setAdminShow={setAdminShow} username={username}/>

    return (
        <div className = 'content'>
            <Header title='Administrador' user={username}/>
            <div className='main-content'>
                <div className='option-container'>
                    <AdminOption setAdminShow={setAdminShow} title={'Contenido'}/>
                    <AdminOption setAdminShow={setAdminShow} title={'Usuarios'}/>
                    <AdminOption setAdminShow={setAdminShow} title={'Anuncios'}/>
                    <AdminOption setAdminShow={setAdminShow} title={'Reporteria'}/>
                </div>
            </div>
        </div>
    )
}

export default AdminPage