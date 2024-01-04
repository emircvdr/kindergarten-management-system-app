import mongoose from "mongoose";

const preliminaryInterviewParentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  motherFullName: String,
  motherPhoneNumber: String,
  motherJob: String,
  fatherFullName: String,
  fatherPhoneNumber: String,
  fatherJob: String,
});

const PreliminaryInterviewParent = mongoose.model(
  "PreliminaryInterviewParent",
  preliminaryInterviewParentSchema
);

export default PreliminaryInterviewParent;
