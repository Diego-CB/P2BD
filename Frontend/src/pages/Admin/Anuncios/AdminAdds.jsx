import React from "react"
import HomeAdd from "./Add/HomeAdd.jsx"
import HomeAnouncer from "./Anouncer/HomeAnouncer.jsx"
import Header from "../../../components/Header.jsx"

const AdminAdds = ({ username, setAdminShow }) => {

    const [toggleAdds,setToggleAdds] = React.useState(0)

    return (
        <div className = 'content'>
            <Header title='Admin-Users' user={username}/>
            <div className='main-content-admin select-users'>
                {toggleAdds == 0 ? 
                    <div className='user-admin-selection'>
                        <button className="default-button"
                            type='button'
                            onClick={() => setToggleAdds(1)}
                        >
                            Administrar Anuncios 
                        </button>
                        
                        <button className="default-button"
                            type='button'
                            onClick={() => setToggleAdds(2)}
                        >
                            Administrar Anunciantes 
                        </button>
                    </div>

                : (toggleAdds == 1 
                    ? <HomeAdd/>
                    : <HomeAnouncer/>
                )
            }</div>
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

export default AdminAdds