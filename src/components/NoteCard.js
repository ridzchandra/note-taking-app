/** @format */

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { Avatar, makeStyles } from "@material-ui/core";
import { blue, green, red, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => {
	return {
		avatar: {
			backgroundColor: (note) => {
				if (note.category === "work") {
					return yellow[700];
				} else if (note.category === "todos") {
					return red[500];
				} else if (note.category === "money") {
					return green[500];
				} else {
					return blue[500];
				}
			},
		},
	};
});

const NoteCard = ({ note, deleteNote }) => {
	const css = useStyles(note);
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar className={css.avatar}>{note.category[0]}</Avatar>
				}
				action={
					<IconButton
						aria-label="delete"
						onClick={() => deleteNote(note.id)}
					>
						<DeleteOutlineRoundedIcon />
					</IconButton>
				}
				title={note.title}
				subheader={note.category}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary">
					{note.details}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default NoteCard;
