import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../pages/notfound/NotFound";
import Dashboard from "../pages/main/Dashboard";
import AddStudentView from "../pages/students/AddStudent/AddStudentView";
import EditStudents from "../pages/students/EditStudent/EditStudent";
import StudentList from "../pages/students/StudentList/StudentList";
import AddPreliminaryInterview from "../pages/preliminaryInterview/AddPreliminaryInterview/AddPreliminaryInterview";
import PreliminaryInterviewList from "../pages/preliminaryInterview/PreliminaryInterviewList/PreliminaryInterviewList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Students */}
        <Route path="/students/add" element={<AddStudentView />} />
        <Route path="/students/edit/:id" element={<EditStudents />} />
        <Route path="/students/list" element={<StudentList />} />

        {/* Preliminary Interview */}
        <Route
          path="/preliminary-interview/add"
          element={<AddPreliminaryInterview />}
        />
        <Route
          path="/preliminary-interview/list"
          element={<PreliminaryInterviewList />}
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
