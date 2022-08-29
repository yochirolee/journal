import { collection, setDoc, doc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../Firebase/config";
import { loadNotes } from "../../Journal/Helpers/loadNotes";
import { fileUpload } from "../../Journal/Helpers/fileUpload";
import {
	addNewEmptyNote,
	isSavingNewNote,
	setActiveNote,
	setNotes,
	setSavingNote,
	updateNote,
	saveImagesOnActiveNote,
	deleteNoteById,
} from "./journalSlice";

export const startNewNote = () => {
	return async (dispatch, getState) => {
		dispatch(isSavingNewNote());
		const { uid } = getState().Auth;

		const newNote = {
			title: "",
			body: "",
			date: new Date().getTime(),
			imagesUrls: [],
		};

		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
		await setDoc(newDoc, newNote);
		newNote.id = newDoc.id;
		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
	};
};

export const startSaveNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().Auth;
		const { active: note } = getState().Journal;

		const noteToFireStore = { ...note };
		delete noteToFireStore.id;

		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		await setDoc(docRef, noteToFireStore, { merge: true });
		dispatch(updateNote(note));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().Auth;
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};

export const startUploadFiles = (files = []) => {
	const URLS = [];
	return async (dispatch, getState) => {
		dispatch(setSavingNote);

		const fileUploadPromise = [];
		for (const file of files) {
			fileUploadPromise.push(fileUpload(file));
		}

		const photosUrls = await Promise.all(fileUploadPromise);
		dispatch(saveImagesOnActiveNote(photosUrls));

		const { uid } = getState().Auth;
		const { active: note } = getState().Journal;

		const noteToFireStore = { ...note };
		delete noteToFireStore.id;

		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		await setDoc(docRef, noteToFireStore, { merge: true });
		dispatch(updateNote(note));
	};
};

export const startDeletingNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().Auth;
		const { active: note } = getState().Journal;
		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		const resp = await deleteDoc(docRef);
		dispatch(deleteNoteById(note.id));
	};
};
