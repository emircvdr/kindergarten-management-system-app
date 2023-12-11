import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/notfound/NotFound';
import Dashboard from '../pages/main/Dashboard';
import AddStudentView from '../pages/students/AddStudentView';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Dashboard */}
                <Route path='/' element={<Dashboard />} />

                {/* Students */}
                <Route path='/students/add' element={<AddStudentView />} />

                {/* 404 Not Found */}
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router