import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  identificationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  birthDate: String,
  birthPlace: String,
  class: String,
  gender: String,
  nationality: String,
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  updatedAt: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
