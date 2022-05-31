import React from "react"
import Header from '../../../components/Header.jsx'
import Reports2 from './Resports2.jsx'
import AdminReports from "./AdminReports.jsx"


const DirectR = ({ setAdminShow, username }) => {

  const [toggleReports, setToggleReports] = React.useState(0)

  if (toggleReports === 1) return (
    <AdminReports 
      setAdminShow={setAdminShow}   
      username={username}   
    />
  )
  
  if (toggleReports === 2) return (
    <Reports2
      setAdminShow={setAdminShow}   
      username={username}   
    />
  )

  return (
    <div className = 'content'>
      <Header title='Admin-Users' user={username}/>
      <div className='main-content-admin select-users'>
        <div className='user-admin-selection'>
          <button className="default-button"
            type='button'
            onClick={() => setToggleReports(1)}
          >
            Reporteria: Parte#1
          </button>
          
          <button className="default-button"
            type='button'
            onClick={() => setToggleReports(2)}
          >
            Reporteria: Parte#2
          </button>
        </div>
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

export default DirectR