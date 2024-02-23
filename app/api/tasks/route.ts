import { connect_to_database } from "@/db";
import { Task } from "@/models/schema";
import { NextResponse } from "next/server";

// Create a task
export async function POST(request: any) {
	const { task } = await request.json();
	await connect_to_database();
	await Task.create({ task });
	return NextResponse.json({ message: "Task Created" }, { status: 201 });
}

// Read all tasks
export async function GET(request: any) {
	await connect_to_database();
	const tasks = await Task.find();
	return NextResponse.json({ tasks });
}

// Delete a task by specific Id
export async function DELETE(request: any) {
	const id = request.nextUrl.searchParams.get("id");
	await connect_to_database();
	await Task.findByIdAndDelete(id);
	return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
}
