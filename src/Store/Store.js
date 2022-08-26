import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./Auth/AuthSlice";
import { JournalSlice } from "./Journal/journalSlice";


export const store = configureStore({
	reducer: {
		Auth: AuthSlice.reducer,
		Journal: JournalSlice.reducer,
	},
});
