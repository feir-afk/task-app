import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
	{
		task: String,
	},
	{
		timestamps: true,
	}
);

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
