import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../Store/Journal/journalSlice";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 240 }) => {
	const { displayName } = useSelector((state) => state.Auth);
	const { notes } = useSelector((state) => state.Journal);
	const dispatch = useDispatch();

	const onActiveChange = (id) => {
		const activeNote = notes.find((note) => note.id === id);
		dispatch(setActiveNote(activeNote));
	};

	return (
		<Box component="nav" sx={{ width: { sm: `${drawerWidth}px` }, flexShrink: { sm: 0 } }}>
			<Drawer
				className="drawer"
				variant="permanent"
				open
				sx={{
					width: { sm: `${240}px` },
					"& /MuiDrawer-paper": { boxSizing: "border-box" },
				}}
			>
				<Toolbar>
					<Typography variannt="h6" noWrap component="div">
						{displayName}
					</Typography>
				</Toolbar>
				<Divider />
				<List
					sx={{
						width: { sm: `${drawerWidth}px` },
					}}
				>
					{notes.map((note) => (
						<SideBarItem key={note.id} onActiveChange={onActiveChange} {...note} />
					))}
				</List>
			</Drawer>
		</Box>
	);
};
