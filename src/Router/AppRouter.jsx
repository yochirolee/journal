import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../Auth/Routes/AuthRoutes";
import { FirebaseAuth } from "../Firebase/config";
import { JournalRoutes } from "../Journal/Routes/JournalRoutes";
import { login, logout } from "../Store/Auth/AuthSlice";
import { startLoadingNotes } from "../Store/Journal/thunks";
import { CheckingAuth } from "../UI/components/CheckingAuth";

export const AppRouter = () => {
	const { status, } = useSelector((state) => state.Auth);
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) return dispatch(logout());
			const { email, uid, displayName } = user;
			dispatch(login({ email, uid, displayName }));
			dispatch(startLoadingNotes())
		});
	}, []);

	if (status === "checking") return <CheckingAuth />;
	return (
		<Routes>
			{status === "authenticated" ? (
				<Route path="/*" element={<JournalRoutes />} />
			) : (
				<Route path="/auth/*" element={<AuthRoutes />} />
			)}

			<Route path="/*" element={<Navigate to="/auth/login" />} />

			{/*Login and Register */}
			{/*<Route path="/auth/*" element={<AuthRoutes />}></Route>
			{/*Journal App */}
			{/*<Route path="/*" element={<JournalRoutes />}></Route>
			 */}
		</Routes>
	);
};
