import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const err = useRouteError(); //more info about error
  return (
    <div>
      <h1>Oops!!</h1>
      <p>Something went wrong. Please try again later.</p>
      <p>{err.status} : {err.statusText}</p>
    </div>
  )
}

export default Error
