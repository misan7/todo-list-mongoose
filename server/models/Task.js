const mongoose = require("mongoose");

const { Schema } = mongoose;

// Use Mongoose timestamps to keep createdAt/modifiedAt in sync.
// Use Date types (not Number) and avoid evaluating timestamps at module load.
const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "modifiedAt" },
  }
);

// Add a small compound index to help common queries (completed + newest first)
TaskSchema.index({ completed: 1, createdAt: -1 });

// toJSON transform: return `id` instead of `_id`, remove __v
TaskSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
