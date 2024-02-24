import Link from "next/link";
import Delete from "./Delete-Button";
import { domain } from "@/domain";

export const getTasks = async () => {
	try {
		const res: Response = await fetch(`${domain}/api/tasks`, {
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch tasks");
		}

		return res.json();
	} catch (error) {
		console.log(error);
	}
};

export default async function Tasks() {
	const data = await getTasks();
	const tasks: Array<Object> = data ? data.tasks : [];

	return (
		<div className="overflow-x-auto mx-4 mb-4 rounded-lg border border-slate-200">
			<table className="table">
				<thead>
					<tr>
						<th>No</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((item: any, index: number) => (
						<tr key={item._id}>
							<th>{index + 1}</th>
							<td className="text-xs sm:text-sm md:text-md ">{item.task}</td>
							<td className="flex gap-4 justify-end">
								<Delete id={item._id} />
								<Link href={`/editTask/${item._id}`}>
									<button className="btn btn-xs sm:btn-sm md:btn-md">
										Edit
									</button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
