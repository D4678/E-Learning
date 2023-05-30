import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpService";
class StudentDetails extends Component {
  state = {
    student: {
      name: this.props.user.name,
      gender: "",
      dob: { date: "", month: "", year: "" },
      about: "",
    },
    gen: [
      { display: "Male", value: "male" },
      { display: "Female", value: "female" },
    ],
    added: false,
    errors: {},
    edit: false,
  };
  async getdata() {
    let { user } = this.props;
    let response = await http.get(`/getStudentDetails/${user.name}`);
    let { data } = response;
    let s1 = { ...this.state };
    s1.student = data.gender ? data : s1.student;
    s1.edit = data.gender ? true : false;
    this.setState(s1);
    if (data.gender) this.makeDOB();
    console.log(response);
  }
  makeDOB = () => {
    let s1 = { ...this.state };
    let json = {};
    let dob = s1.student.dob.split("-");
    json.date = dob[0];
    json.month = dob[1];
    json.year = dob[2];
    s1.student.dob = json;
    this.setState(s1);
  };
  componentDidMount() {
    this.getdata();
  }
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.student[input.name] = input.value;
    this.setState(s1);
  };
  async postData(url, obj) {
    try {
      let response = await http.post(url, obj);
      console.log(response);
      if (response) {
        alert(JSON.stringify(response.data) + " Added");
        this.setState({
          customer: {
            name: this.props.user.name,
            gender: "",
            about: "",
            dob: { date: "", month: "", year: "" },
          },
          errors: {},
          edit: true,
        });
        window.location = "/studentDetails";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ msg: ex.response.data });
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.checkErrors();
    console.log(errors);
    if (this.isvalid(errors)) {
      let s1 = { ...this.state };
      s1.student.dob =
        s1.student.dob.date +
        "-" +
        s1.student.dob.month +
        "-" +
        s1.student.dob.year;
      this.setState(s1);
      this.postData("/postStudentDetails", this.state.student);
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
  checkErrors = () => {
    let { gender, dob } = this.state.student;
    let json = {};
    json.gender = this.handleValidateGender(gender);
    json.dob = this.handleValidateDob(dob);
    return json;
  };
  handleValidateGender = (gender) => (!gender ? "Choose your Gender" : "");

  handleValidateDob = (dob) =>
    !dob.date || !dob.month || !dob.year ? "Select Date Of Birth" : "";

  render() {
    let { student = {}, gen, edit, added } = this.state;
    let { gender, dob, about, errors = {} } = student;
    return (
      <div className="container">
        <h3 className="mt-4">Student Details</h3>
        <div className="row">
          {this.makeRadio(gen, gender, "gender", "Gender", errors.gender)}
          {this.makeDD(dob, "Date Of Birth", "dob", errors.dob)}
          <div className="col-12">
            <hr />
            <label className="font-weight-bold">
              About Myself<span className="text-danger">*</span>
            </label>
          </div>
          <div className="col-12">
            <textarea
              class="form-control"
              name="about"
              value={about}
              onChange={this.handleChange}
              rows="5"
            ></textarea>
          </div>
          {edit ? (
            ""
          ) : (
            <button className="btn btn-primary m-3" onClick={this.handleSubmit}>
              Add Details
            </button>
          )}
        </div>
      </div>
    );
  }
  makeDD = (dob, label, name, errors) => {
    console.log(dob);
    let date = [];
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let year = [];
    for (let i = 1980; i <= 2021; i++) {
      year.push(i);
    }
    let num = this.state.student.dob.month === "February" ? 29 : 31;
    for (let i = 0; i <= num; i++) {
      date.push(i);
    }
    return (
      <React.Fragment>
        <div className="col-12">
          <hr />
          <label className="font-weight-bold">{label}</label>
          <span className="text-danger">*</span>
        </div>
        <div className="col-4">
          {this.makeDropDown(year, name + "year", dob.year, "Year", errors)}
        </div>
        <div className="col-4">
          {this.makeDropDown(month, name + "month", dob.month, "Month")}
        </div>
        <div className="col-4">
          {this.makeDropDown(date, name + "date", dob.date, "Date")}
        </div>
      </React.Fragment>
    );
  };
  makeDropDown = (arr = [], name, value, valOnTop, errors = "") => {
    if (name === "city") {
      if (value.substring(0, 1) === " ")
        value = value.substring(1, value.length - 1);
      else value = value;
    }
    return (
      <React.Fragment>
        <select
          className="form-control"
          name={name}
          value={value}
          onChange={this.handleDD}
        >
          <option value="">{valOnTop}</option>
          {arr.map((opt, index) => (
            <option key={index}>{opt}</option>
          ))}
        </select>
        {errors ? <span className="text-danger">{errors}</span> : ""}
      </React.Fragment>
    );
  };
  handleDD = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    console.log(input.name);
    if (input.name === "dobdate") s1.student.dob.date = input.value;
    else if (input.name === "dobmonth") s1.student.dob.month = input.value;
    else if (input.name === "dobyear") s1.student.dob.year = input.value;
    this.setState(s1);
  };
  makeRadio = (arr, values, name, label, errors = "") => {
    return (
      <React.Fragment>
        <div className="col-3">
          <label className="form-check-label font-weight-bold">
            {label}
            <span className="text-danger">*</span>
          </label>
        </div>
        <div className="col-9">
          <div className="row">
            {arr.map((opt, index) => (
              <div className="col-4">
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
        {errors ? <span className="text-danger ml-4">{errors}</span> : ""}
      </React.Fragment>
    );
  };
}
export default StudentDetails;
