import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient();

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<React.StrictMode>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</React.StrictMode>
	</QueryClientProvider>
);
