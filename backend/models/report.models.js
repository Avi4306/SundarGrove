import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String }, // Cloudinary URL
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
  },
  { timestamps: true }
);

reportSchema.index({ location: "2dsphere" });

export default mongoose.model("Report", reportSchema);