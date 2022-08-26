import { AppRouter } from "./Router/AppRouter";
import { AppTheme } from "./Themes/AppTheme";
export const JournalApp = () => {
	return (
		<AppTheme>
			<AppRouter />
		</AppTheme>
	);
};
