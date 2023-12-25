import mongoose from "mongoose";

const studentPhotoSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  photo: String,
});

const StudentPhoto = mongoose.model("StudentPhoto", studentPhotoSchema);

export default StudentPhoto;
