import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes } from 'react-router-dom'
import './index.css'
import ResumeBuilder from './ResumeBuilder/ResumeBuilder'
import NavBar from './navbar/NavBar'
import MainPage from './MainPage/MainPage'
import { Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import LoginPage from './auth/LoginPage'
import SignUpPage from './auth/SignUpPage'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider>
            {/* navbar element  */}

            <BrowserRouter>
                {' '}
                <AuthProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/resume-builder"
                            element={
                                // <ProtectedRoute>
                                <ResumeBuilder />
                                // </ProtectedRoute>
                            }
                        />

                        <Route path="/signup" element={<SignUpPage />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
)
