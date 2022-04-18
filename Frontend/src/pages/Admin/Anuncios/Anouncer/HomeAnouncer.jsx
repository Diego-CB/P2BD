import React from "react"
import AnnounceList from "./AnnounceList.jsx"
import NewAdd from './NewAdd.jsx'
import AlterAd from './AlterAd.jsx'
import DeleteAdd from './DeleteAdd.jsx'

const HomeAnouncer = () => {

    const [ads, setAds] = React.useState([])

    return (
        <div className='main-content-admin content-admin-page'>
            <AnnounceList ads={ads} setAds={setAds}/>
            <NewAdd setAds={setAds}/>
            <AlterAd setAds={setAds}/>
            <DeleteAdd setAds={setAds}/>
        </div>
    )
}

export default HomeAnouncer