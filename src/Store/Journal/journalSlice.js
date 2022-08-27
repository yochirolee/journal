import { createSlice } from "@reduxjs/toolkit";
export const JournalSlice = createSlice({
	name: "Journal",
	initialState: {
		isSaving: false,
		messageSaved: "",
		notes: [],
		active: null,
		imageURL: [],
	},
	reducers: {
		addNewEmptyNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
			state.messageSaved = "";
		},
		isSavingNewNote: (state, action) => {
			state.isSaving = true;
			state.messageSaved = "";

		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setSavingNote: (state, action) => {
			state.isSaving = true;
		},
		updateNote: (state, action) => {
			state.notes = state.notes.map((note) => {
				if (note.id === action.payload.id) {
					return action.payload;
				}
				return note;
			});

			state.messageSaved = `${action.payload.title}, updated sucessfully`;
		},

		deleteNoteById: (state, action) => {},
	},
});

export const {
	addNewEmptyNote,
	setActiveNote,
	setNotes,
	setSavingNote,
	updateNote,
	deleteNoteById,
	isSavingNewNote,
} = JournalSlice.actions;
