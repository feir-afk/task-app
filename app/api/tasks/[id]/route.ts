import { connect_to_database } from "@/db";
import { Task } from "@/models/schema";
import { NextRequest, NextResponse } from "next/server";

// Update a task
export async function PUT(request: NextRequest, { params }: any) {
	const { id } = params;
	const { newTask: task } = await request.json();
	await connect_to_database();
	await Task.findByIdAndUpdate(id, { task });
	return NextResponse.json(
		{ message: "Task Updated" },
		{
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		}
	);
}

// Find a task
export async function GET(request: NextRequest, { params }: any) {
	const { id } = params;
	await connect_to_database();
	const task = await Task.findOne({ _id: id });
	return NextResponse.json(
		{ task },
		{
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		}
	);
}
