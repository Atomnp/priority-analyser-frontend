import { Grid, Typography } from "@material-ui/core";

const Footer = () => {
  return (
    <div>
      <Grid
        spacing={3}
        justify="center"
        alignContent="center"
        alignItems="center"
        container
      >
        <Grid xs={3} item>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography>About us</Typography>
            <p>AAyush</p>
            <p>AAyush</p>
            <p>AAyush</p>
          </div>
        </Grid>
        <Grid xs={3} item>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography>About us</Typography>
            <p>AAyush</p>
            <p>AAyush</p>
            <p>AAyush</p>
          </div>
        </Grid>
        <Grid xs={3} item>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography>About us</Typography>
            <p>AAyush</p>
            <p>AAyush</p>
            <p>AAyush</p>
          </div>
        </Grid>

        {/* <Grid xs={3} item>
          <Typography>About us</Typography>
        </Grid>
        <Grid xs={3} item>
          <Typography>About us</Typography>
        </Grid>
        <Grid xs={3} item>
          <Typography>About us</Typography>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Footer;
