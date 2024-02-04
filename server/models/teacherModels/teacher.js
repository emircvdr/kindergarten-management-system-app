import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  fullName: String,
  gender: String,
  dutyGroup: String,
  birthDate: String,
  phoneNumber: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
