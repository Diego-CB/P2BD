import React from 'react'
import AlterProfile from './AlterProfile.jsx'
import BanProfile from './BanProfile.jsx'

import ProfileList from './ProfileList.jsx'

const HomeAProfile = ({}) => {

    const [profileList, setProfileList] = React.useState([])

    return (
        <div className='main-content-admin content-admin-page admin-users-home'>
            <ProfileList list={profileList} setProfileList={setProfileList}/>
            <AlterProfile setProfileList={setProfileList} />
            <BanProfile setProfileList={setProfileList}/>
        </div>
    )
}

export default HomeAProfile