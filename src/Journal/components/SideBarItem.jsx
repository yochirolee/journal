import { React, useMemo } from "react";
import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export const SideBarItem = ({ title = "", body, id, date,onActiveChange }) => {
	const newTitle = useMemo(() => {
		return title.length > 17 ? title.substring(0, 17) + "..." : title;
	});
	return (
		<ListItem disablePadding onClick={()=>onActiveChange(id)}>
			<ListItemButton>
				<ListItemIcon>
					<TurnedInNot />
				</ListItemIcon>
				<Grid container>
					<ListItemText primary={newTitle}></ListItemText>
					<ListItemText secondary={body}></ListItemText>
				</Grid>
			</ListItemButton>
		</ListItem>
	);
};
