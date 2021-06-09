import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({component: Component, ...rest}) {
    const { currentUser }  = useAuth()
    console.log(currentUser)
    return (
        <Route 
            {...rest} 
            render={props => {
                if (currentUser) return <Component {...props}/>
                else return <Redirect to='/auth/login'/>
            }}
        />
    )
}

export default ProtectedRoute
