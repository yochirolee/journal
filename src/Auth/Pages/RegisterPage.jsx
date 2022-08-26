import { Link as RouterLink } from "react-router-dom";
import { useState, useMemo } from "react";
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material";
import { AuthLayout } from "../Layout/AuthLayout";
import { useForm } from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../Store/Auth/Thunks";

const formValidations = {
	email: [(value) => value.includes("@"), "Email must contain an @"],
	password: [(value) => value.length >= 6, "Password must have more than 6 character"],
	displayName: [(value) => value.length >= 3, "Name is mandatory"],
};
const formData = {
	email: "",
	password: "",
	displayName: "",
};

export const RegisterPage = () => {
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.Auth);
	const isCheckingAuth = useMemo(() => status === "checking", [status]);

	const [formSubmitted, setFormSubmitted] = useState(false);
	const {
		displayName,
		email,
		password,
		formState,
		onInputChange,
		isFormValid,
		displayNameValid,
		emailValid,
		passwordValid,
		resetForm,
	} = useForm(formData, formValidations);

	const onSubmit = (event) => {
		event.preventDefault();
		setFormSubmitted(true);
		if (!isFormValid) return;

		dispatch(startCreatingUserWithEmailPassword(email, password, displayName));
	};

	return (
		<AuthLayout title="Register">
			<form className="animate__animated animate_fadeIn animate__faster" onSubmit={onSubmit}>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							onChange={onInputChange}
							value={displayName}
							name="displayName"
							label="Full Name"
							type="text"
							placeholder="John Doe"
							fullWidth
							error={!!displayNameValid && formSubmitted}
							helperText={displayNameValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							onChange={onInputChange}
							value={email}
							name="email"
							label="Email"
							type="email"
							placeholder="correo@example.com"
							fullWidth
							error={!!emailValid && formSubmitted}
							helperText={emailValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							onChange={onInputChange}
							value={password}
							name="password"
							label="Password"
							type="password"
							placeholder="Password"
							fullWidth
							error={!!passwordValid && formSubmitted}
							helperText={passwordValid}
						/>
					</Grid>
					<Grid container spacing={2} sx={{ mt: 2 }}>
						<Grid item xs={12} md={6}>
							{errorMessage ? <Alert severity="error">{errorMessage}</Alert> : ""}
						</Grid>
						<Grid item xs={12} md={6}>
							<Button disabled={isCheckingAuth} type="submit" variant="contained" fullWidth>
								Create Account
							</Button>
						</Grid>
					</Grid>
					<Grid container sx={{ mt: 2 }} direction="row" justifyContent="end">
						<Typography sx={{ mr: 1 }}>Already have an account?</Typography>
						<Link component={RouterLink} color="inherit" to="/auth/login">
							Login
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
