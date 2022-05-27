import React from "react"
import Header from "../../../components/Header.jsx"
import Top5Content from "./Parte2/Top5Content.jsx"
import Top10Terms from "./Parte2/Top10Terms.jsx"
import Top20Movies from "./Parte2/Top20Movies.jsx"
import Top5Admins from "./Parte2/Top5Admins.jsx"

const AdminReports = ({ username, setAdminShow }) => {

  return (
    <div className = 'content'>
      <Header title='Admin-Reportes' user={username}/>
      <div className='main-content-admin content-admin-page admin-reports'>
        <Top5Content/>
        <Top10Terms/>
        <Top5Admins/>
        <Top20Movies/>
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
