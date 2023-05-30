import React, { Component } from "react";
import http from "./httpService";
class RegisterStudent extends Component {
  state = {
    student: { name: "", password: "", confirmPswd: "", email: "", role: "" },
    errors: {},
    roles: [
      { display: "Student", value: "student" },
      { display: "Faculty", value: "faculty" },
    ],
    msg: "",
  };
  handleChange = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.student[input.name] = input.value;
    this.handleValidate(e);
    this.setState(s1);
  };
  isvalid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isvalid(errors);
  };
  validateAll = () => {
    let { name, password, confirmPswd, email, role } = this.state.student;
    let errors = {};
    errors.name = this.validateName(name);
    errors.password = this.validatePassword(password);
    errors.confirmPswd = this.validateCnfrmPswd(password, confirmPswd);
    errors.email = this.validateEmail(email);
    errors.role = this.validateRole(role);
    return errors;
  };
  handleValidate = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    switch (input.name) {
      case "name":
        s1.errors.name = this.validateName(input.value);
        break;
      case "password":
        s1.errors.password = this.validatePassword(input.value);
        break;
      case "confirmPswd":
        s1.errors.confirmPswd = this.validateCnfrmPswd(
          s1.student.password,
          input.value
        );
        break;
      case "email":
        s1.errors.email = this.validateEmail(input.value);
        break;
      case "role":
        s1.errors.role = this.validateRole(input.value);
        break;
      default:
        break;
    }
    this.setState(s1);
  };
  validateName = (name) => (!name ? "Name is Required" : "");

  validateEmail = (email) => {
    let format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) return "Email is Required";
    else if (!format.test(email)) return "Not a valid email";
    else return "";
  };
  validatePassword = (password) =>
    password
      ? password.length < 7
        ? "Password must be atleast of 7 characters"
        : ""
      : "Password is Required";

  validateCnfrmPswd = (password, confirmPswd) => {
    if (!confirmPswd) return "Confirm Password is Required";
    else if (confirmPswd !== password) return "Password do not Match";
    else return "";
  };
  validateRole = (role) => (!role ? "Choose Role" : "");
  handleSubmit = (e) => {
    e.preventDefault();
    let { name, email, password, role } = this.state.student;
    let json = {};
    json.name = name;
    json.email = email;
    json.password = password;
    json.role = role;
    console.log(json);
    this.postData("/register", json);
  };
  async postData(url, obj) {
    try {
      let response = await http.post(url, obj);
      if (response) {
        alert("user Created Succesfully");
        this.setState({
          student: {
            name: "",
            password: "",
            confirmPswd: "",
            email: "",
            role: "",
          },
          errors: {},
        });
      }
    } catch (ex) {
      if (
        (ex.response && ex.response.status === 400) ||
        ex.response.status === 500
      ) {
        this.setState({ msg: ex.response.data });
      }
    }
  }
  render() {
    let { student, errors, roles, msg } = this.state;
    let { name, password, confirmPswd, email, role } = student;
    return (
      <div className="container">
        <h5 className="mt-3">Register</h5>
        <h5>{msg ? <span className="text-danger">{msg}</span> : ""}</h5>
        {this.makeTextField(
          "name",
          name,
          "Name",
          "Enter Your Name",
          errors.name
        )}
        {this.makeTextField(
          "password",
          password,
          "Password",
          "Enter Password",
          errors.password
        )}
        {this.makeTextField(
          "confirmPswd",
          confirmPswd,
          "Confirm Password",
          "Re-Enter your Password",
          errors.confirmPswd
        )}
        {this.makeTextField(
          "email",
          email,
          "Email",
          "Enter Your email",
          errors.email
        )}
        {this.makeRadio(roles, role, "role", "Role")}
        <button
          className="btn btn-primary mt-2"
          disabled={!this.isFormValid()}
          onClick={this.handleSubmit}
        >
          Register
        </button>
      </div>
    );
  }
  makeRadio = (arr, values, name, label) => {
    return (
      <div className="row">
        <div className="col-12">
          <label className="form-check-label">
            {label}
            <span className="text-danger">*</span>
          </label>
        </div>
        <div className="row">
          {arr.map((opt, index) => (
            <div className="col-12 mx-3" key={index}>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  value={opt.value}
                  name={name}
                  checked={values === opt.value}
                  onChange={this.handleChange}
                />
                <label className="form-check-label">{opt.display}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  makeTextField = (name, value, label, placeholder, errors = "") => {
    let edit = this.state.edit;
    return (
      <div className="row">
        <div className="col-12">
          <label>
            {label}
            <span className="text-danger">*</span>
          </label>
        </div>
        <div className="col-12">
          <div className="form-group">
            <input
              type={
                name === "password" || name === "confirmPswd"
                  ? "password"
                  : name === "email"
                  ? "email"
                  : "text"
              }
              className="form-control"
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={this.handleChange}
            />
            {errors ? <span className="text-danger">{errors}</span> : ""}
          </div>
        </div>
      </div>
    );
  };
}
export default RegisterStudent;
