import React from "react"

import Perfiles from "./Perfiles.jsx"
import AdminPage from "./AdminPage.jsx"

const DirectUser = ({ isAdmin, username }) => {

    if (isAdmin) return <AdminPage username={username}/>
    return <Perfiles Username={username}/>
}

export default DirectUser