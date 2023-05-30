import React, { Component } from "react";
import http from "./httpService";
class EditClass extends Component {
  state = {
    classObj: this.props.classObj,
    courses: [],
    errors: {},
  };
  async getData() {
    let response = await http.get("/getCourses");
    let arr = response.data.reduce(
      (acc, curr) =>
        acc.find((val) => val === curr.name) ? acc : [...acc, curr.name],
      []
    );
    console.log(arr);
    this.setState({ courses: arr });
    console.log(response);
  }
  componentDidMount() {
    this.getData();
  }
  handleChange = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.classObj[input.name] = input.value;
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
    let { course, time, endTime, topic } = this.state.classObj;
    let errors = {};
    errors.course = this.validateCourse(course);
    errors.time = this.validateTime(time);
    errors.endTime = this.validateEndTime(endTime);
    errors.topic = this.validateTopic(topic);
    return errors;
  };
  handleValidate = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    switch (input.name) {
      case "course":
        s1.errors.course = this.validateCourse(input.value);
        break;
      case "time":
        s1.errors.time = this.validateTime(input.value);
        break;
      case "endTime":
        s1.errors.endTime = this.validateEndTime(input.value);
        break;
      case "topic":
        s1.errors.topic = this.validateTopic(input.value);
        break;
      default:
        break;
    }
    this.setState(s1);
  };
  validateCourse = (course) => (!course ? "Course Name is Required" : "");
  validateTime = (time) => (!time ? "Start Time is Required" : "");
  validateEndTime = (endTime) => (!endTime ? "End Time is Required" : "");
  validateTopic = (topic) => (!topic ? "Topic is Required" : "");

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.putData(
      `/postClass/${this.state.classObj.classId}`,
      this.state.classObj
    );
  };
  render() {
    let { classObj, errors = {}, courses = [] } = this.state;
    let { course, time, endTime, topic } = classObj;
    return (
      <div className="container">
        <h5 className="mt-3">Schedule a Class</h5>
        {this.makeDD(courses, course, "course", "Select Course Name")}
        {this.makeTextField("time", time, "Time", "", errors.time)}
        {this.makeTextField("endTime", endTime, "End Time", "", errors.endTime)}
        {this.makeTextField(
          "topic",
          topic,
          "Topic",
          "Enter Class Topic",
          errors.topic
        )}
        <button
          className="btn btn-primary mt-2"
          disabled={!this.isFormValid()}
          onClick={this.handleSubmit}
        >
          Schedule
        </button>
      </div>
    );
  }
  makeDD = (arr, value, name, valOnTop) => {
    return (
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <select
              className="form-control"
              name={name}
              value={value}
              onChange={this.handleChange}
            >
              <option value="">{valOnTop}</option>
              {arr.map((opt) => (
                <option>{opt}</option>
              ))}
            </select>
          </div>
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
              type={name === "time" || name === "endTime" ? "time" : "text"}
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
export default EditClass;
