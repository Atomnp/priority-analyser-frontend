import React from "react";
import { Link, NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

import MobileSvg from "../static//IOE_Rankmobile.svg";
import LogoSvg from "../static/ali_thulo_gap_vako.svg";

import Dropdown from "./Dropdown";
import BottomNav from "./BottomNav";
import TextField from "@material-ui/core/TextField";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.primary.main,
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
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    margin: "0.2rem 0.5rem",
  },
  subtitle: {
    margin: "2rem 2rem 0.5rem",
    borderBottom: "1px solid",
    borderBottomColor: theme.palette.grey[500],
    fontSize: "1.1rem",
  },
  navLink: {
    textDecoration: "none",
    color: theme.palette.grey[100],
    padding: "0.5rem",
    margin: "0rem 0.4rem",
    borderRadius: "2px",
    "&:hover": {
      transitionDelay: "0.1s",
      textDecoration: "none",
      color: theme.palette.grey[100],
      backgroundColor: theme.palette.primary.light,
    },
  },
  activeLink: {
    transitionDelay: "0.1s",
    color: theme.palette.grey[100],
    // backgroundColor: theme.palette.primary.light,
    borderBottom: "2px solid",
    borderBottomColor: theme.palette.secondary.light,
  },
  textfield: {
    margin: "0.8rem 2.2rem 0.8rem 1.8rem",

  }
}));

function ResponsiveDrawer(props) {
  const { window, location } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.mobAppBar}>
        <img width="150" height="50" src={LogoSvg} alt="logo"></img>
      </div>

      <Typography variant="button" component="h3" className={classes.subtitle}>
        Filters
      </Typography>

      {props.collegeList && (
        <Dropdown
          type={"College"}
          options={props.collegeList.map((item) => item.code)}
          selected={props.selectedCollege}
          handleSelect={props.setSelectedCollege}
        />
      )}
      {props.currentPage !== "priority" && props.facultyList && (
        <Dropdown
          type={"Faculty"}
          options={props.facultyList.map((item) => item.code)}
          selected={props.selectedFaculty}
          handleSelect={props.setSelectedFaculty}
        />
      )}
      {props.currentPage === "priority" && (
        <TextField
          className={classes.textfield}
          id="min-rank"
          label="Minimum Rank"
          type="number"
          value={props.minRank}
          onChange={(event) => {
            props.onMinRankChange(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
          // variant="outlined"
        />
      )}
      {props.currentPage === "priority" && (
        <TextField
          className={classes.textfield}
          id="max-rank"
          label="Maximum Rank"
          type="number"
          value={props.maxRank}
          onChange={(event) => {
            props.onMaxRankChange(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
          // variant="outlined"
        />
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <div className={classes.root}>
        {/* appbar starts here */}
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
              <Link to="/" className={classes.title}>
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
            <Hidden smUp implementation="css" className={classes.title}>
              <img
                style={{ margin: "0 auto" }}
                width="100"
                height="30"
                src={MobileSvg}
                alt="logo"
              ></img>
            </Hidden>

            <Switch
              checked={props.darkState}
              onChange={props.handleThemeChange}
            />
            <Hidden xsDown implementation="css">
              <NavLink
                className={classes.navLink}
                activeClassName={classes.activeLink}
                to="/predict"
              >
                <Typography variant="button">Prediction</Typography>
              </NavLink>
              <NavLink
                className={classes.navLink}
                activeClassName={classes.activeLink}
                to="/analyse"
              >
                <Typography variant="button">Cutoff Analysis</Typography>
              </NavLink>
              <NavLink
                className={classes.navLink}
                activeClassName={classes.activeLink}
                to="/priority"
              >
                <Typography variant="button">Rank Analysis</Typography>
              </NavLink>

              <NavLink
                className={classes.navLink}
                activeClassName={classes.activeLink}
                to="/location"
              >
                <Typography variant="button">Location</Typography>
              </NavLink>

              
              <NavLink
                className={classes.navLink}
                activeClassName={classes.activeLink}
                to="/faq"
              >
                <Typography variant="button">FAQ</Typography>
              </NavLink>
            </Hidden>
          </Toolbar>
        </AppBar>
        {/* appbar ends here */}

        {/* drawer starts here */}

        {props.currentPage !== 'faq' && <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor="left"
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
        </nav>}
        {/* drawer ends here  */}

        {/* main body starts here */}
        <main className={classes.content}>
          <div className={classes.toolbar}></div>
          {props.children}
        </main>
        {/* main body ends here */}
      </div>

      {/* bottom navigation for mobile starts here */}
      <Hidden smUp implementation="css">
        <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
          <BottomNav />
        </div>
      </Hidden>
      {/* bottom navigation for mobile ends here */}
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
