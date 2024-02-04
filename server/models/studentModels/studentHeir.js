import mongoose from "mongoose";

const studentHeirSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: String,
  identificationNumber: String,
  phoneNumber: String,
  job: String,
  address: String,
  workAddress: String,
  email: String,
  isParent: Boolean,
  createdAt: String,
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

const StudentHeir = mongoose.model("StudentHeir", studentHeirSchema);

export default StudentHeir;
