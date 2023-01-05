// protected route tsx

import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'
import { useContext } from 'react'

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext)

    //modal state
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()

    // if login is not successful, dont close modal
    // if login is successful, close modal and redirect to protected route

    const handleLogin = () => {
        // login logic
        // if login is successful, close modal and redirect to protected route
        // if login is not successful, dont close modal
        onClose()
    }

    if (!token) {
        // pop up login form
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute
