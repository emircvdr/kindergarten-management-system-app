import Employee from "../models/employeeModels/employee.js";

export const createEmployee = async (req, res) => {
  const employee = req.body;
  try {
    const newEmployee = new Employee({
      fullName: employee.fullName,
      gender: employee.gender,
      dutyGroup: employee.dutyGroup,
      birthDate: employee.birthDate,
      phoneNumber: employee.phoneNumber,
    });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(409).json({
      message: "Employee not created",
      error,
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({
      isDeleted: false,
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({
      message: "Employees not found",
      error,
    });
  }
};

export const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      res.status(404).json({
        message: "Employee not found",
      });
    }
    const employeeCopy = {
      fullName: employee.fullName,
      gender: employee.gender,
      dutyGroup: employee.dutyGroup,
      birthDate: employee.birthDate,
      phoneNumber: employee.phoneNumber,
      isActive: employee.isActive,
    };
    const data = {
      employee: employeeCopy,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({
      message: "Employee not found",
      error,
    });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      fullName: employee.fullName,
      gender: employee.gender,
      dutyGroup: employee.dutyGroup,
      birthDate: employee.birthDate,
      phoneNumber: employee.phoneNumber,
      isActive: employee.isActive,
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(404).json({
      message: "Employee not updated",
      error,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      res.status(404).json({
        message: "Employee not found",
      });
    }
    await Employee.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    res.status(200).json({
      message: "Personel silindi",
    });
  } catch (error) {
    res.status(404).json({
      message: "Employee not found",
      error,
    });
  }
};
