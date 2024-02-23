"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
	// Create a task
	const [task, setTask] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!task) {
			// alert message
			alert("Task input is empty!");
			return;
		}

		try {
			const res = await fetch("http://localhost:3000/api/tasks", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ task }),
			});

			if (res.ok) {
				router.refresh();
			} else {
				throw new Error("Failed to create a new");
			}
		} catch (error) {
			console.log(error);
		}

		setTask("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex justify-center items-center p-4 gap-4"
		>
			<input
				onChange={(e) => setTask(e.target.value.slice(0, 40))}
				value={task}
				type="text"
				placeholder="Add new task"
				className="input input-xs sm:input-sm md:input-md input-bordered w-full max-w-xs "
			/>
			<button className="btn btn-xs sm:btn-sm md:btn-md" type="submit">
				Add Task
			</button>
		</form>
	);
}
