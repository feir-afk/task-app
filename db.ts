import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string;
export const connect_to_database = async () => {
	try {
		await mongoose.connect(uri);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log(error);
	}
};
