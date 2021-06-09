import React, { useState, useContext } from 'react'
import axios from 'axios'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    async function getUserData(){
        console.log('Get User Data function triggered')
        await axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:4000/user'
        })
        .then(res => {
            setCurrentUser(res.data)
            console.log(res.data)
        })
        .catch(err => { 
            const errorMessage =  { code: 605, message: 'Could not fetch user data'}
            throw errorMessage 
        })
    }

    async function register(data) {
        await axios({
            method: 'post',
            data: data, 
            withCredentials: true,
            url: 'http://localhost:4000/register/email'
        })
        .then(async function (res) {
            console.log(res)
            if (res.data === 'User already exists') {
                const errorMessage =  { code: 601, message: 'User already Exists'}
                throw errorMessage 
            }
            else await getUserData()
        })
        .catch((err) => { 
            console.log('There is some error')
            const errorMessage =  { code: 602, message: 'Could not register user'}
            throw errorMessage  
        })
    }

    async function login(data) {
        await axios({
            method: 'post',
            data: data,
            withCredentials: true, 
            url: 'http://localhost:4000/login/email'
        })
        .then(async function (res) {
            console.log(res)
            if (res.data === 'No user exists') {
                const errorMessage =  { code: 603, message: 'Invalid credentials'}
                throw errorMessage  
            }
            else await getUserData()
        })
        .catch((err) => { 
            const errorMessage =  { code: 604, message: 'Could not login user'}
            throw errorMessage   
        })
    }

    async function logout() {
        await axios({
            method: 'post',
            withCredentials: true, 
            url: 'http://localhost:4000/logout'
        })
        .then(res => {
            setCurrentUser(null)
            console.log('Successfuly logged out user')
        })
        .catch(err => {
            const errorMessage =  { code: 606, message: 'Could not logout user'}
            throw errorMessage 
        })
    }

    const value = {
        currentUser,
        setCurrentUser,
        register,
        login,
        getUserData,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
