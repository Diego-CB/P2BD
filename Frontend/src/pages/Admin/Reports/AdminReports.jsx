import React from "react"
import Top10 from "./Top10.jsx"
import Header from "../../../components/Header.jsx"
import CategoryR from "./CategoryR.jsx"
import Cast10 from "./Cast10.jsx"
import QCuentas from './QCuentas.jsx'
import TopHour from './TopHour.jsx'

const AdminReports = ({ username, setAdminShow }) => {

    return (
        <div className = 'content'>
			<Header title='Admin-Reportes' user={username}/>
			<div className='main-content-admin content-admin-page admin-reports'>
                <Top10/>
                <CategoryR/>
                <Cast10/>
                <QCuentas/>
                <TopHour/>
            </div>
            <footer className="admin-footer">
                <button 
                    className="default-button nav-button"
                    onClick={() => setAdminShow(0)}
                >
                    Ir a Homepage
                </button>
            </footer>
        </div>
    )
}

export default AdminReports