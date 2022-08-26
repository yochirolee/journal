import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, TextField, Button, Alert, Link } from "@mui/material";
import { useMemo } from "react";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../Layout/AuthLayout";
import { useForm } from "../../Hooks/useForm";
import {
	checkingAuth,
	startGoogleSignIn,
	startLoginWithEmailAndPassword,
} from "../../Store/Auth/Thunks";

const formData = { email: "", password: "" };
export const LoginPage = () => {
	const { email, password, onInputChange } = useForm(formData);
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.Auth);
	const isAuthenticated = useMemo(() => status === "checking", [status]);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(startLoginWithEmailAndPassword(email, password));
	};

	const onGoogleSignIn = () => {
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title="Login">
			{status}
			<form className="animate__animated animate_fadeIn animate__faster" onSubmit={onSubmit}>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							onChange={onInputChange}
							label="Correo"
							name="email"
							type="email"
							placeholder="correo@example.com"
							fullWidth
							value={email}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							onChange={onInputChange}
							label="Password"
							name="password"
							type="password"
							placeholder="Password"
							fullWidth
							value={password}
						/>
						<Grid item xs={12} sx={{ mt: 2 }} display={!!errorMessage ? "" : "none"}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
					</Grid>
					<Grid container spacing={2} sx={{ mt: 2 }}>
						<Grid item xs={12} md={6}>
							<Button disabled={isAuthenticated} type="submit" variant="contained" fullWidth>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} md={6}>
							<Button
								disabled={isAuthenticated}
								onClick={onGoogleSignIn}
								variant="contained"
								fullWidth
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>
					<Grid container sx={{ mt: 2 }} direction="row" justifyContent="end">
						<Link component={RouterLink} color="inherit" to="/auth/register">
							Crear una Cuenta
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
