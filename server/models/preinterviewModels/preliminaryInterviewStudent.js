import mongoose from "mongoose";

const preliminaryInterviewStudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthDate: String,
  gender: String,
  ageGroup: String,
  preinterviewDate: String,
});

const PreliminaryInterviewStudent = mongoose.model(
  "PreliminaryInterviewStudent",
  preliminaryInterviewStudentSchema
);

export default PreliminaryInterviewStudent;
