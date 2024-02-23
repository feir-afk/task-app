"use client";

import { domain } from "@/domain";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditForm({ id, task }: any) {
	const [newTask, setNewTask] = useState<string>(task);
	const router = useRouter();

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		// using regex to check if input empty or whitespace only
		const isWhitespaceString: boolean = !newTask.replace(/\s/g, "").length;

		if (isWhitespaceString) {
			alert("Task input is empty!");
			return;
		}

		try {
			const res = await fetch(`${domain}/api/tasks/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ newTask }),
			});

			if (res.ok) {
				router.push("/");
				router.refresh();
			} else {
				throw new Error("Failed to update task by id");
			}
			return res.json();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full flex justify-center gap-4 items-center p-4"
		>
			<input
				onChange={(event) => setNewTask(event.target.value.slice(0, 40))}
				value={newTask.slice(0, 40)}
				type="text"
				placeholder="Type here"
				className="input input-bordered w-full max-w-xs"
			/>
			<button className="btn btn-xs sm:btn-sm md:btn-md" type="submit">
				Update
			</button>
		</form>
	);
}
