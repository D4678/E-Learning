import React, { Component } from "react";
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
class StudentPortal extends Component {
  render() {
    return (
      <div className="container">
        <Grid container component="main" sx={{ height: 'calc(100vh - 60px)' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={12}
            md={12}
            sx={{
              backgroundImage: 'url(https://cdn.dribbble.com/users/2882545/screenshots/14163045/media/48b4f52a119018192ec0b110bea1796a.png?compress=1&resize=1600x1200&vertical=top)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>
        {/* <h6 className="text-center mt-5 text-warning display-4">
          Welcome to Student dashboard
        </h6> */}
      </div>
    );
  }
}
export default StudentPortal;
