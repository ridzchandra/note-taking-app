/** @format */

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { deepPurple, orange, purple, yellow } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import { Paper } from "@material-ui/core";

const theme = createMuiTheme({
	typography: {
		fontFamily: `"Alegreya Sans SC", sans-serif`,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
	palette: {
		type: "dark",
		primary: yellow,
		secondary: orange,
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Layout>
					<Paper
						style={{
							width: "100%",
							height: "100%",
							backgroundColor: "#303030",
						}}
						square
					>
						<Switch>
							<Route path="/" exact>
								<Notes />
							</Route>
							<Route path="/create">
								<Create />
							</Route>
						</Switch>
					</Paper>
				</Layout>
			</Router>
		</ThemeProvider>
	);
}

export default App;
