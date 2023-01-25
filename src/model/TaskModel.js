const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // sector: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Sector",
    //   required: true,
    // },
    sector: [
      {
        sectorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sector",
          required: true,
        },
      },
    ],
    agree: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
