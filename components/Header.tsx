"use client";

import { domain } from "@/domain";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
	// Create a task
	const [task, setTask] = useState<string>("");
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		// using regex to check if input empty or whitespace only
		const isWhitespaceString: boolean = !task.replace(/\s/g, "").length;

		if (isWhitespaceString) {
			alert("Task input is empty!");
			return;
		}

		try {
			const res: Response = await fetch(`${domain}/api/tasks`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ task }),
			});

			if (res.ok) {
				router.refresh();
			} else {
				throw new Error("Failed to create a new task");
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
				onChange={(event) => setTask(event.target.value.slice(0, 40))}
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
