import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  className: String,
  ageGroup: String,
  classCapacity: String,
  relatedTeacher: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Class = mongoose.model("Classes", classSchema);

export default Class;
