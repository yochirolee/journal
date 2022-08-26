import { collection, setDoc, doc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../Firebase/config";
import { loadNotes } from "../../Journal/Helpers/loadNotes";
import { addNewEmptyNote, isSavingNewNote, setActiveNote, setNotes } from "./journalSlice";

export const startNewNote = () => {
	return async (dispatch, getState) => {
		dispatch(isSavingNewNote());
		const { uid } = getState().Auth;

		const newNote = {
			title: "",
			body: "",
			date: new Date().getTime(),
		};

		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
		await setDoc(newDoc, newNote);
		newNote.id = newDoc.id;
		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().Auth;
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};
