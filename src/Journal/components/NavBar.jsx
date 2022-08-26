import { AppBar, Grid, Typography, IconButton, Toolbar } from "@mui/material";
import { MenuOutlined, LogoutOutlined } from "@mui/icons-material";
import {  useDispatch } from "react-redux";
import { startLogOut } from "../../Store/Auth/Thunks";
export const Navbar = ({ drawerWidth = 240 }) => {
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(startLogOut());
	};

	return (
		<AppBar
			position="fixed"
			sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
		>
			<Toolbar>
				<IconButton color="inherit" edge="start" sx={{ mr: 2, display: { sm: "none" } }}>
					<MenuOutlined />
				</IconButton>
				<Grid container direction="row" justifyContent="space-between" alignItems="center">
					<Typography variant="h6" noWrap component="div">
						Journal App
					</Typography>
					<IconButton color="error" onClick={onLogout}>
						<LogoutOutlined />
					</IconButton>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
