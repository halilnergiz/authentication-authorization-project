import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login, Register, User, Admin, Error } from './components/index'

class App extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<User />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        )
    }
}

export default App
