import React from 'react'
import UserBan from './UserBan.jsx'
import UserList from './UserList.jsx'
import UserModify from './UserModify.jsx'

const HomeAUser = ({}) => {

    const [userList, setUserList] = React.useState([])

    userList.length == 0 && true

    return (
        <div className='main-content-admin content-admin-page admin-users-home'>
            <UserList setUserList={setUserList} userList={userList}/>
            <UserModify setUserList={setUserList}/>
            <UserBan setUserList={setUserList}/>
        </div>
    )
}

export default HomeAUser