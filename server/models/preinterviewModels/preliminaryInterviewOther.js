import mongoose from "mongoose";

const preliminaryInterviewOtherSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  paymentMethod: String,
  installmentPayment: String,
  unitinstallmentPayment: String,
  contractAmount: String,
  interviewNotes: String,
});

const PreliminaryInterviewOther = mongoose.model(
  "PreliminaryInterviewOther",
  preliminaryInterviewOtherSchema
);

export default PreliminaryInterviewOther;
