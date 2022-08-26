import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import PurpleTheme from "./purpleTheme";

export const AppTheme = ({ children }) => {
	return (
		<ThemeProvider theme={PurpleTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
