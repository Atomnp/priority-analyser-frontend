import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dropdown from "./Dropdown";
import BottomNav from "./BottomNav";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  /* we can do some javascript with theme object here */

  return {
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.up("sm")]: {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: {
      minHeight: 30,
    },

    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
      marginLeft: "1rem",
    },
    navItems: {
      textDecoration: "none",
    },
  };
});

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Typography align="left" variant="h6" className={classes.title}>
        Filters
      </Typography>
      <div className={classes.toolbar} /> <Divider />
      {Object.entries(props.filters).map(([key, val]) => {
        return (
          <Dropdown
            type={key}
            options={val["list"]}
            selected={val["selected"]}
            handleSelect={val["handleSelect"]}
          />
        );
      })}
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <svg
              width="79"
              height="32"
              viewBox="0 0 79 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.2841 45C28.3659 35.1558 11.7955 36.5634 5 40.6652V10.741C19.8977 5.00787 30.4394 9.90204 40.2841 14.6563M40.2841 45C46.0341 40.6186 64.8 31.3523 74 36.61V5.00787C64.4167 4.82143 40.2841 7.94439 40.2841 14.6563M40.2841 45V14.6563"
                stroke="#DD4C4C"
                stroke-width="10"
              />
            </svg>
            <Typography variant="h6" className={classes.title}>
              Rank Analyser
            </Typography>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/predict"
            >
              <Button color="inherit">Predict</Button>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/analyse"
            >
              <Button color="inherit">Analyse</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <div className={classes.content}>
          <div className={classes.toolbar}></div>
          {props.children}
        </div>
      </div>

      <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <BottomNav />
      </div>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
