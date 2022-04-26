/** @format */

import Drawer from "@material-ui/core/Drawer";
import { Avatar, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NotesIcon from "@material-ui/icons/Notes";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useHistory, useLocation } from "react-router";
import { format } from "date-fns";

const drawerWidth = 240;

const menuItems = [
	{
		text: "My Notes",
		icon: <NotesIcon color="secondary" />,
		path: "/",
	},
	{
		text: "New Note",
		icon: <AddCircleOutlineIcon color="secondary" />,
		path: "/create",
	},
];

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: "flex",
		},
		page: {
			background: "#f9f9f9",
			width: "100%",
		},
		drawer: {
			width: drawerWidth,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		drawerTitle: {
			padding: theme.spacing(3),
		},
		appBar: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		toolbar: theme.mixins.toolbar,
		date: {
			flexGrow: 1,
		},
		avatar: {
			margin: theme.spacing(2),
		},
	};
});

const Layout = ({ children }) => {
	const css = useStyles();
	const history = useHistory();
	const location = useLocation();
	return (
		<div className={css.root}>
			{/* AppBar */}
			<AppBar position="fixed" className={css.appBar} elevation={0}>
				<Toolbar>
					<Typography variant="h6" noWrap className={css.date}>
						{`Today is ${format(new Date(), "do MMMM y")}`}
					</Typography>
					<Typography variant="h6" noWrap>
						Gopher
					</Typography>
					<Avatar src="/avatar.png" className={css.avatar} />
				</Toolbar>
			</AppBar>
			{/* Side Drawer */}
			<Drawer
				className={css.drawer}
				variant="permanent"
				anchor="left"
				classes={{ paper: css.drawerPaper }}
			>
				<Typography variant="h5" className={css.drawerTitle}>
					Ridz' Notes
				</Typography>
				<List>
					{menuItems.map((menuItem) => {
						return (
							<ListItem
								button
								onClick={() => history.push(menuItem.path)}
								key={menuItem.text}
								selected={
									location.pathname === menuItem.path
										? true
										: false
								}
							>
								<ListItemIcon>{menuItem.icon}</ListItemIcon>
								<ListItemText primary={menuItem.text} />
							</ListItem>
						);
					})}
				</List>
			</Drawer>
			<div className={css.page}>
				<div className={css.toolbar} />
				{children}
			</div>
		</div>
	);
};

export default Layout;
