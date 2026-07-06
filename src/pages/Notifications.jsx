import React from 'react'
import { useOutletContext } from 'react-router-dom';

function Notifications() {
  const { data } = useOutletContext();
  return (
    <div>
      Notifications
    </div>
  )
}

export default Notifications
