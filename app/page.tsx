import Header from "@/components/Header";
import Tasks from "@/components/Tasks";

export default function Home() {
	return (
		<main>
			<Header />
			<div className=" lg:px-72">
				<Tasks />
			</div>
		</main>
	);
}
