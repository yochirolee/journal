import { Grid, TextField, Typography, Button } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../Hooks/useForm";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote } from "../../Store/Journal/thunks";
import { setActiveNote } from "../../Store/Journal/journalSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = ({ active, messageSaved }) => {
	const dispatch = useDispatch();
	const { body, date, title, onInputChange, formState } = useForm(active);

	const dateString = useMemo(() => {
		return new Date(date).toUTCString();
	}, [date]);

	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState]);

	useEffect(() => {
		if (messageSaved.length > 0) Swal.fire("Updated", messageSaved, "success");
	}, [messageSaved]);

	const onFormSubmit = (event) => {
		event.preventDefault();
		dispatch(startSaveNote());
	};

	return (
		<Grid
			className="animate__animated animate_fadeIn animate__faster"
			container
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			sx={{ mb: 1 }}
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{dateString}
				</Typography>
			</Grid>
			<br />
			<form onSubmit={onFormSubmit}>
				<Grid item>
					<Button type="submit" color="primary" sx={{ padding: 2 }}>
						<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
						Guardar
					</Button>
				</Grid>
				<Grid container>
					<TextField
						type="text"
						variant="filled"
						fullWidth
						placeholder="Enter a Title"
						label="title"
						name="title"
						value={title}
						sx={{ border: "none, mb:1" }}
						onChange={onInputChange}
					></TextField>
					<TextField
						type="text"
						variant="filled"
						name="body"
						value={body}
						multiline
						fullWidth
						placeholder="Whats Happends Today"
						label="description"
						sx={{ border: "none, mb:2" }}
						minRows="5"
						onChange={onInputChange}
					></TextField>
				</Grid>
			</form>
			<ImageGallery />
		</Grid>
	);
};
