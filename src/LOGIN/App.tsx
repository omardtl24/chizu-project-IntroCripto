"use client";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/authContext'
import ProtectedRoute from './components/ProtectedRoute'
import Dash from './pages/dash'
import Home from './pages/home'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route 
                        path="/dash"
                        element={ 
                            <ProtectedRoute>
                                <Dash />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
