import { connect_to_database } from "@/db";
import { Task } from "@/models/schema";
import { NextRequest, NextResponse } from "next/server";

// Create a task
export async function POST(request: Request) {
	const { task } = await request.json();
	await connect_to_database();
	await Task.create({ task });
	return NextResponse.json(
		{ message: "Task Created" },
		{
			status: 201,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		}
	);
}

// Read all tasks
export async function GET(request: Request) {
	await connect_to_database();
	const tasks = await Task.find();
	return NextResponse.json({ tasks });
}

// Delete a task by specific Id
export async function DELETE(request: NextRequest) {
	const id = request.nextUrl.searchParams.get("id");
	await connect_to_database();
	await Task.findByIdAndDelete(id);
	return NextResponse.json(
		{ message: "Task Deleted" },
		{
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "DELETE",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		}
	);
}
