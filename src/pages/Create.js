/** @format */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles((theme) => {
	return {
		formField: {
			marginTop: 20,
			marginBottom: 20,
			display: "block",
		},
		page: {
			padding: theme.spacing(5),
		},
	};
});

const Create = () => {
	const css = useStyles();
	const [note, setNote] = useState({});
	const [title, setTitle] = useState("");
	const [details, setDetails] = useState("");
	const [category, setCategory] = useState("todos");
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);
	const history = useHistory();

	useEffect(() => {
		setNote({
			title,
			details,
			category,
		});
	}, [title, details, category]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setTitleError(title === "" ? true : false);
		setDetailsError(details === "" ? true : false);
		if (title && details) {
			fetch(`http://localhost:5000/notes`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(note),
			})
				.then(() => history.push("/"))
				.catch((err) => console.log(err.message));
			setTitle("");
			setDetails("");
		}
	};

	return (
		<Container className={css.page}>
			<Typography gutterBottom variant="h6" color="textSecondary">
				Create a new note
			</Typography>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					className={css.formField}
					label="Note title"
					variant="filled"
					// margin="normal"
					style={{ display: "block" }}
					required
					fullWidth
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					error={titleError}
				/>
				<TextField
					className={css.formField}
					label="Details"
					variant="outlined"
					// margin="normal"
					style={{ display: "block" }}
					required
					fullWidth
					multiline
					rows={18}
					value={details}
					onChange={(e) => setDetails(e.target.value)}
					error={detailsError}
				/>

				<FormControl className={css.formField}>
					<FormLabel>category</FormLabel>
					<RadioGroup
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<FormControlLabel
							label="Money"
							value="money"
							control={<Radio />}
						/>
						<FormControlLabel
							label="Todos"
							value="todos"
							control={<Radio />}
						/>
						<FormControlLabel
							label="Work"
							value="work"
							control={<Radio />}
						/>
						<FormControlLabel
							label="Visa"
							value="visa"
							control={<Radio />}
						/>
					</RadioGroup>
				</FormControl>

				<Button
					type="submit"
					color="secondary"
					variant="contained"
					endIcon={<ArrowForwardIosRoundedIcon />}
				>
					<Typography variant="button">Submit</Typography>
				</Button>
			</form>
		</Container>
	);
};

export default Create;
