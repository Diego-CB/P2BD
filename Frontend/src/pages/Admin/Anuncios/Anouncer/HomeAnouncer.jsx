import React from "react"
import AnnounceList from "./AnnounceList.jsx"
import NewAdd from './NewAdd.jsx'
import AlterAd from './AlterAd.jsx'
import DeleteAdd from './DeleteAdd.jsx'

const HomeAnouncer = ( {username} ) => {

    const [ads, setAds] = React.useState([])

    return (
        <div className='main-content-admin content-admin-page'>
            <AnnounceList ads={ads} setAds={setAds}/>
            <NewAdd setAds={setAds} username={username}/>
            <AlterAd setAds={setAds} username={username}/>
            <DeleteAdd setAds={setAds}/>
        </div>
    )
}

export default HomeAnouncer