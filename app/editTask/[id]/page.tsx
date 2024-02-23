import EditForm from "@/components/Edit-Task-Form";

const getTaskById = async (id: any) => {
	try {
		const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
			cache: "no-store",
		});
		if (!res.ok) {
			throw new Error("Failed to fetch task");
		}

		return res.json();
	} catch (err) {
		console.log(err);
	}
};

export default async function EditTask({ params }: any) {
	const { id } = params;
	const { task } = await getTaskById(id);
	return (
		<div className="">
			<EditForm id={id} task={task.task} />
		</div>
	);
}
