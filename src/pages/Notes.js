/** @format */

import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
	default: 3,
	1100: 2,
	500: 1,
};

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const deleteNote = (id) => {
		setNotes(notes.filter((note) => note.id !== id));
		fetch(`http://localhost:5000/notes/${id}`, {
			method: "DELETE",
		});
	};

	useEffect(() => {
		fetch(`http://localhost:5000/notes`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.status);
				} else {
					return res.json();
				}
			})
			.then((data) => setNotes(data))
			.catch((err) => console.log(err.message));
	}, []);
	return (
		<Container>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{notes.map((note) => (
					<div key={note.id} xs={12} sm={6} md lg xl>
						<NoteCard note={note} deleteNote={deleteNote} />
					</div>
				))}
			</Masonry>
		</Container>
	);
};

export default Notes;
