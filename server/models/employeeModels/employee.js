import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
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

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
