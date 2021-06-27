// import { createUseStyles } from "react-jss";
// import { Link } from "react-router-dom";
// import { Navbar, Alignment, Button } from "@blueprintjs/core";

// const useStyles = createUseStyles({
//   navbar: {
//     backgroundColor: "#004E7C",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "0.3rem 0",
//   },
//   link: {
//     // flexBasis: "1",
//     color: "white",
//     textDecoration: "none",
//     margin: "2rem 2rem",
//   },
//   leftwala: {
//     display: "flex",
//     flexBasis: "1",
//   },
// });
// const NavBar = () => {
//   const styles = useStyles();
//   return (
//     <div className={styles.navbar}>
//       <div className={styles.leftwala}>
//         <svg
//           width="79"
//           height="52"
//           viewBox="0 0 79 52"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M40.2841 45C28.3659 35.1558 11.7955 36.5634 5 40.6652V10.741C19.8977 5.00787 30.4394 9.90204 40.2841 14.6563M40.2841 45C46.0341 40.6186 64.8 31.3523 74 36.61V5.00787C64.4167 4.82143 40.2841 7.94439 40.2841 14.6563M40.2841 45V14.6563"
//             stroke="#DD4C4C"
//             stroke-width="10"
//           />
//         </svg>
//         <h1>Rank Analyser</h1>
//       </div>
//       <Link className={styles.link} style={{ textDecoration: "none" }} to="/">
//         <p>Predict</p>
//       </Link>
//       <Link
//         className={styles.link}
//         style={{ textDecoration: "none" }}
//         to="/analyze"
//       >
//         <p>Analyze</p>
//       </Link>
//     </div>
//   );
// };
// // const NavBar = () => {
// //   const styles = useStyles();
// //   return (
// //     <Navbar className={styles.navbar}>
// //       <Navbar.Group align={Alignment.LEFT}>
// //         <Navbar.Heading>BE Rank Analyser</Navbar.Heading>
// //       </Navbar.Group>
// //       <Navbar.Group className={styles.right} align={Alignment.RIGHT}>
// //         <div className={styles.right}>
// //           <Link className={styles.link} to="/">
// //             <p>Predict</p>
// //           </Link>
// //           <Link className={styles.link} to="/predict">
// //             <p>Analyze</p>
// //           </Link>
// //         </div>
// //       </Navbar.Group>
// //     </Navbar>
// //   );
// // };
// export default NavBar;
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
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
          <Button color="inherit">Predict</Button>
          <Button color="inherit">Analyse</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
