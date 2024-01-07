import React from 'react'
import { Link } from 'react-router-dom'
export default function () {
  return (
    <div>
       <Link to={"/usersdata"}><button>Users Data</button></Link> 
    </div>
  )
}
