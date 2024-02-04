import mongoose from "mongoose";

const studentOtherSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  bloodGroup: String,
  isParentsTogether: String,
  isAllergy: Boolean,
  allergyType: String,
  isChronicDisease: Boolean,
  chronicDiseaseType: String,
  emergencyContactFullName: String,
  emergencyContactPhoneNumber: String,
  emergencyContactDegreeOfProximity: String,
  paymentMethod: String,
  paymentAmount: String,
  installmentPayment: String,
  unitinstallmentPayment: String,
  contractAmount: String,
  interviewNotes: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const StudentOther = mongoose.model("StudentOther", studentOtherSchema);

export default StudentOther;
