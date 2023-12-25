import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../pages/notfound/NotFound";
import Dashboard from "../pages/main/Dashboard";
import AddStudentView from "../pages/students/AddStudent/AddStudentView";
import EditStudents from "../pages/students/EditStudent/EditStudent";
import StudentList from "../pages/students/StudentList/StudentList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Students */}
        <Route path="/students/add" element={<AddStudentView />} />
        <Route path="/students/edit" element={<EditStudents />} />
        <Route path="/students/list" element={<StudentList />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
