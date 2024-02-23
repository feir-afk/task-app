"use client";

import { useRouter } from "next/navigation";

export default function Delete({ id }: any) {
	const router = useRouter();
	const deleteTask = async () => {
		const res = await fetch(`http://localhost:3000/api/tasks?id=${id}`, {
			method: "DELETE",
		});

		if (!res.ok) {
			throw new Error("Failed to delete a task");
		} else {
			router.refresh();
		}
	};

	return (
		<button className="btn btn-xs sm:btn-sm md:btn-md" onClick={deleteTask}>
			Delete
		</button>
	);
}
