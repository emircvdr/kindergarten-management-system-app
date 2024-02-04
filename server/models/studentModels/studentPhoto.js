import mongoose from "mongoose";

const studentPhotoSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  photo: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const StudentPhoto = mongoose.model("StudentPhoto", studentPhotoSchema);

export default StudentPhoto;
