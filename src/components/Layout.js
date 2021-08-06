// import React from "react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

import LogoSvg from "../static/ali_thulo_gap_vako.svg";
import MobileSvg from "../static//IOE_Rankmobile.svg";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  lightBlue,
  blueGrey,
  deepOrange,
  yellow,
} from "@material-ui/core/colors";

import Dropdown from "./Dropdown";
import BottomNav from "./BottomNav";
// import { height, minHeight } from "@material-ui/system";

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
    mobAppBar: {
      backgroundColor: lightBlue[800],
      textAlign: "center",
      minHeight: 30,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.up("sm")]: {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
      },
      // height: "5rem",
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
      // padding: theme.spacing(3),
      padding: "3rem 0",
    },
    title: {
      flexGrow: 1,
      marginLeft: "1rem",
    },
    navItems: {
      textDecoration: "none",
    },
    navLink: {
      textDecoration: "none",
      color: "black",
      "&:hover": {
        color: "white",
        textDecoration: "none",
      },
    },

    activeLink: {
      textDecoration: "none",
      color: "white",
    },
  };
});

function ResponsiveDrawer(props) {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? blueGrey[800] : lightBlue[800];
  const mainSecondaryColor = darkState ? deepOrange[500] : yellow[800];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.mobAppBar}>
        <img width="150" height="50" src={LogoSvg} alt="logo"></img>
      </div>
      <div className={classes.toolbar} />
      {props.collegeList && (
        <Dropdown
          type={"College"}
          options={props.collegeList.map((item) => item.code)}
          selected={props.selectedCollege}
          handleSelect={props.setSelectedCollege}
        />
      )}
      {props.facultyList && (
        <Dropdown
          type={"Faculty"}
          options={props.facultyList.map((item) => item.code)}
          selected={props.selectedFaculty}
          handleSelect={props.setSelectedFaculty}
        />
      )}
      {/* <Divider /> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={darkTheme}>
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
              <Hidden xsDown>
                <Link to="/">
                  <img
                    onClick={() => props.setShowResult(false)}
                    style={{ margin: "0 auto" }}
                    width="150"
                    height="50"
                    src={LogoSvg}
                    alt="logo"
                  ></img>
                </Link>
              </Hidden>
              <Hidden smUp implementation="css">
                <img
                  style={{ margin: "0 auto" }}
                  width="100"
                  height="30"
                  src={MobileSvg}
                  alt="logo"
                ></img>
              </Hidden>

              <Typography variant="h6" className={classes.title}></Typography>
              <Switch checked={darkState} onChange={handleThemeChange} />
              <Hidden xsDown implementation="css">
                <NavLink
                  className={classes.navLink}
                  activeClassName={classes.activeLink}
                  to="/predict"
                >
                  <Button color="inherit">Predict</Button>
                </NavLink>
                <NavLink
                  className={classes.navLink}
                  activeClassName={classes.activeLink}
                  to="/analyse"
                >
                  <Button color="inherit">Analyse</Button>
                </NavLink>
              </Hidden>
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
        <Hidden smUp implementation="css">
          <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
            <BottomNav />
          </div>
        </Hidden>
      </div>
    </ThemeProvider>
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
