import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
});

const refreshTokenModel = mongoose.model("RefreshToken", refreshTokenSchema);

export default refreshTokenModel;
