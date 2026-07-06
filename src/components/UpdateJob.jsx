import React, { useEffect } from 'react'

function UpdateJob({data,userId}) {
  useEffect(()=> {
    console.log(data,userId)
  },[])
  return (
    <div>
      Update Data
    </div>
  )
}

export default UpdateJob
