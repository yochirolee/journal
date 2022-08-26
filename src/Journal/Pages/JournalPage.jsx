import { useDispatch, useSelector } from "react-redux";
import {  IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { JournalLayout } from "../Layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../Views";
import { startNewNote } from "../../Store/Journal/thunks";
export const JournalPage = () => {
	const dispatch = useDispatch();
	const { isSaving, active } = useSelector((state) => state.Journal);
	const onClickNewNote = () => {
		dispatch(startNewNote());
	};

	return (
		<JournalLayout>
			{!!active ? <NoteView active={active} /> : <NothingSelectedView />}

			<IconButton
				onClick={onClickNewNote}
				className="animate__animated animate_fadeIn animate__faster"
				size="large"
				disabled={isSaving}
				sx={{
					color: "white",
					backgroundColor: "error.main",
					hover: { backgroundColor: "error.main", opacity: 0.9 },
					position: "fixed",
					right: 50,
					bottom: 50,
				}}
			>
				<AddOutlined sx={{ fontSize: 15 }}></AddOutlined>
			</IconButton>
		</JournalLayout>
	);
};
