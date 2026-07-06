import React from 'react'
import { useOutletContext } from 'react-router-dom';

function UserNotifictions() {
    const { data } = useOutletContext();
    return (
        <div>
            UserNotifictions
        </div>
    )
}

export default UserNotifictions
