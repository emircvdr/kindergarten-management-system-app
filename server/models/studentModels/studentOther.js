import mongoose from "mongoose";

const studentOtherSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    bloodGroup: String,
    isParentsTogether: String,
    isAllergy: Boolean,
    allergyType: String,
    isChronicDisease: Boolean,
    chronicDiseaseType: String,
    emergencyContactFullName: String,
    emergencyContactPhoneNumber: String,
    emergencyContactDegreeOfProximity: String
})

const StudentOther = mongoose.model("StudentOther", studentOtherSchema);

export default StudentOther;

