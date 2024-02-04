import mongoose from "mongoose";

const preliminaryInterviewStudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthDate: String,
  gender: String,
  ageGroup: String,
  preinterviewDate: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const PreliminaryInterviewStudent = mongoose.model(
  "PreliminaryInterviewStudent",
  preliminaryInterviewStudentSchema
);

export default PreliminaryInterviewStudent;
