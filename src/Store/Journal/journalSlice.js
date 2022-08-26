import { createSlice } from "@reduxjs/toolkit";
export const JournalSlice = createSlice({
	name: "Journal",
	initialState: {
		isSaving: false,
		messageSaved: "",
		notes: [],
		active: null,
		imageURL:[]
	},
	reducers: {
		addNewEmptyNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
		},
		isSavingNewNote: (state, action) => {
			state.isSaving = true;
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setNote: (state, action) => {},
		setSavingNote: (state, action) => {},
		updateNote: (state, action) => {},
		deleteNoteById: (state, action) => {},
	},
});

export const {
	addNewEmptyNote,
	setActiveNote,
	setNote,
	setNotes,
	setSavingNote,
	updateNote,
	deleteNoteById,
	isSavingNewNote,
} = JournalSlice.actions;
