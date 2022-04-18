import React from "react"
import AdsList from './AdsList.jsx'
import AlterAd from "./AlterAd.jsx"
import DeleteAdd from "./DeleteAdd.jsx"
import NewAdd from "./NewAdd.jsx"

const HomeAdd = ({ }) => {

    const [ads, setAds] = React.useState([])

    return (
        <div className='main-content-admin content-admin-page'>
            <AdsList ads={ads} setAds={setAds}/>
            <NewAdd setAds={setAds}/>
            <AlterAd setAds={setAds}/>
            <DeleteAdd setAds={setAds}/>
        </div>
    )
}

export default HomeAdd