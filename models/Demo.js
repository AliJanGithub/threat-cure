import mongoose from "mongoose";

const DemoSchema = new mongoose.Schema(
  {
    mainCategory: {
      type: String,
      enum: ["Solutions", "Services", "Development"],
      required: true,
    },

    subCategory: {
      type: [String], // list of selected options
      default: [],
    },

    decideLater: {
      type: Boolean,
      default: false,
    },

    userName: {
      type: String,
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent overwrite model error in hot reload
export default mongoose.models.Demo
  ? mongoose.models.Demo
  : mongoose.model("Demo", DemoSchema);