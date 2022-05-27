import React from "react"
import Header from "../../../components/Header.jsx"
import Top5Content from "./Parte2/Top5Content.jsx"

const Top10Terms = () => {

  const handleTop10Terms = () => {
    return
  }

  return <div>top 10 terms</div>
}

const Top5Admins = () => {

  const handleTop5Admins = () => {
    return
  }

  return <div>top 10 terms</div>
}

const Top20Movies = () => {

  const handleTop20Moviess = () => {
    return
  }

  return <div>top 20 movies</div>
}

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
