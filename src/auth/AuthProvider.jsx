// Auth provider jsx

import React, { useState, useEffect, useContext } from 'react'

import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext({
    token: null,
    handleLogin: (token, userId, expiresAt) => {},
    handleLogout: () => {},
    isLoggedIn: false,
    userId: null,
})

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [expiresAt, setExpiresAt] = useState(
        localStorage.getItem('expiresAt')
    )
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = (token, userId, expiresAt) => {
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
        localStorage.setItem('expiresAt', expiresAt)
        setToken(token)
        setExpiresAt(expiresAt)
        setUserId(userId)
        setIsLoggedIn(true)
    }
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expiresAt')
        setToken(null)
        setExpiresAt(null)
        setUserId(null)
        setIsLoggedIn(false)
        navigate('/')
    }
    //
    if (token && expiresAt) {
        if (new Date(expiresAt) < new Date()) {
            // handleLogout();
            console.log('expired')
            console.log(new Date(expiresAt))
        }
    }
    useEffect(() => {
        console.log('useEffect in AuthProvider')
        if (token && expiresAt) {
            if (new Date(parseInt(expiresAt)) > new Date()) {
                setIsLoggedIn(true)
            }
        } else {
            setIsLoggedIn(false)
        }
    }, [])
    const value = {
        token,
        handleLogin,
        handleLogout,
        isLoggedIn,
        userId,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
