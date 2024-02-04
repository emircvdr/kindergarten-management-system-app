import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../pages/notfound/NotFound";
import Dashboard from "../pages/main/Dashboard";
import AddStudentView from "../pages/students/AddStudent/AddStudentView";
import EditStudents from "../pages/students/EditStudent/EditStudent";
import StudentList from "../pages/students/StudentList/StudentList";
import AddPreliminaryInterview from "../pages/preliminaryInterview/AddPreliminaryInterview/AddPreliminaryInterview";
import PreliminaryInterviewList from "../pages/preliminaryInterview/PreliminaryInterviewList/PreliminaryInterviewList";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Schedule from "../pages/schedule/Schedule";
import Paramaters from "../pages/parameters/Paramaters";
import AddClassView from "../pages/classes/AddClass/AddClassView";
import AddTeacherView from "../pages/teachers/AddTeacher/AddTeacherView";
import AddEmployeeView from "../pages/employees/AddEmployee/AddEmployeeView";
import EditPreliminaryInterview from "../pages/preliminaryInterview/EditPreliminaryInterview/EditPreliminaryInterview";
import TeacherList from "../pages/teachers/TeacherList/TeacherList";
import EditTeacherView from "../pages/teachers/EditTeacher/EditTeacherView";
import EditClassView from "../pages/classes/EditClass/EditClassView";
import ClassesList from "../pages/classes/ClassesList/ClassesList";
import EmployeeList from "../pages/employees/EmployeeList/EmployeeList";
import EditEmployeeView from "../pages/employees/EditEmployee/EditEmployeeView";

// import Schedule from "../pages/schedule/Schedule";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
        <Route
          path="/preliminary-interview/edit/:id"
          element={<EditPreliminaryInterview />}
        />
        {/* Schedule */}
        <Route path="/schedule/list" element={<Schedule />} />

        {/*Parameters*/}
        <Route path="/parameters" element={<Paramaters />} />

        {/* Classes */}
        <Route path="/class/add" element={<AddClassView />} />
        <Route path="/class/edit/:id" element={<EditClassView />} />
        <Route path="/class/list" element={<ClassesList />} />

        {/* Teachers */}
        <Route path="/teacher/add" element={<AddTeacherView />} />
        <Route path="/teacher/list" element={<TeacherList />} />
        <Route path="/teacher/edit/:id" element={<EditTeacherView />} />

        {/* Employees */}
        <Route path="/employee/add" element={<AddEmployeeView />} />
        <Route path="/employee/list" element={<EmployeeList />} />
        <Route path="/employee/edit/:id" element={<EditEmployeeView />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
