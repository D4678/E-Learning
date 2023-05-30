import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { Component } from "react";
//import { Link } from "react-router-dom";
import http from "./httpService";
import auth from "./authService";
const theme = createTheme();
class Login extends Component {
  state = {
    user: { email: "", password: "" },
    btn: false,
    errors: {},
    msg: "",
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.user[input.name] = input.value;
    this.handleValidate(e);
    s1.btn = s1.errors.password ? false : true;
    this.setState(s1);
  };
  handleValidate = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    let { password } = s1.user;
    switch (input.name) {
      case "password":
        s1.errors.password = this.handleValidatePswd(password);
        break;
      default:
        break;
    }
    this.setState(s1);
  };
  async login(url, obj) {
    try {
      let response = await http.post(url, obj);
      console.log(response);
      auth.login(response.data);
      window.location =
        response.data.role === "admin"
          ? "/admin"
          : response.data.role === "student"
            ? "/student"
            : response.data.role === "faculty"
              ? "/faculty"
              : "";
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        console.log(ex.response);
        let msg = "Login failed. Check the Username and Password";
        this.setState({ msg: msg });
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.checkErrors(this.state.user);
    console.log(errors);
    if (this.isvalid(errors)) {
      this.setState({ btn: true });
      this.login("/login", this.state.user);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  isvalid = (errors) => {
    console.log(errors);
    let keys = Object.keys(errors);
    console.log(keys);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };
  checkErrors = (user) => {
    let { password } = user;
    let json = {};
    json.password = this.handleValidatePswd(password);
    return json;
  };
  handleValidatePswd = (password) =>
    password
      ? password.length < 7
        ? "Password must be atleast of 7 characters"
        : ""
      : "Password is Mandatory";
  render() {
    const { email = "", password = "" } = this.state.user;
    let { errors = null, btn, msg } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: 'calc(100vh - 60px)' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://cdn.dribbble.com/users/2882545/screenshots/14163045/media/48b4f52a119018192ec0b110bea1796a.png?compress=1&resize=1600x1200&vertical=top)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 25,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={this.handleChange}
                />
                <span className="text-muted">
                  We'll never share your user name with anyone else.
                </span>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.handleChange}
                />
                {errors && (
                  <span className="text-center text-danger">
                    {errors.password}
                  </span>
                )}
                <br />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
export default Login;
