import { connect_to_database } from "@/db";
import { Task } from "@/models/schema";
import { NextResponse } from "next/server";

// Update a task
export async function PUT(request: any, { params }: any) {
	const { id } = params;
	const { newTask: task } = await request.json();
	await connect_to_database();
	await Task.findByIdAndUpdate(id, { task });
	return NextResponse.json({ message: "Task Updated" }, { status: 200 });
}

// Find a task
export async function GET(request: any, { params }: any) {
	const { id } = params;
	await connect_to_database();
	const task = await Task.findOne({ _id: id });
	return NextResponse.json({ task }, { status: 200 });
}
