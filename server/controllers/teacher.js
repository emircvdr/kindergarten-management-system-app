import Teacher from "../models/teacherModels/teacher.js";

export const createTeacher = async (req, res) => {
  const teacher = req.body;
  try {
    const newTeacher = new Teacher({
      fullName: teacher.fullName,
      gender: teacher.gender,
      dutyGroup: teacher.dutyGroup,
      birthDate: teacher.birthDate,
      phoneNumber: teacher.phoneNumber,
    });
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(409).json({
      message: "Teacher not created",
      error,
    });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({
      isDeleted: false,
    });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(404).json({
      message: "Teachers not found",
      error,
    });
  }
};

export const getTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      res.status(404).json({
        message: "Teacher not found",
      });
    }
    const teacherCopy = {
      fullName: teacher.fullName,
      gender: teacher.gender,
      dutyGroup: teacher.dutyGroup,
      birthDate: teacher.birthDate,
      phoneNumber: teacher.phoneNumber,
      isActive: teacher.isActive,
    };
    const data = {
      teacher: teacherCopy,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({
      message: "Teacher not found",
      error,
    });
  }
};

export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const teacher = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, {
      fullName: teacher.fullName,
      gender: teacher.gender,
      dutyGroup: teacher.dutyGroup,
      birthDate: teacher.birthDate,
      phoneNumber: teacher.phoneNumber,
      isActive: teacher.isActive,
    });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(409).json({
      message: "Teacher not updated",
      error,
    });
  }
};

export const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      res.status(404).json({
        message: "Öğretmen bulunamadı",
      });
    }
    await Teacher.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    res.status(200).json({
      message: "Öğretmen silindi",
    });
  } catch (error) {
    res.status(409).json({
      message: "Öğretmen silinemedi",
      error,
    });
  }
};
