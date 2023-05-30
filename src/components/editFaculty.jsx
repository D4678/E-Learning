import React, { Component } from "react";
class EditCourse extends Component {
  state = { course: this.props.course };
  handleChange = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    input.type === "checkbox"
      ? (s1.course[input.name] = this.updateCBs(
          s1.course[input.name],
          input.checked,
          input.value
        ))
      : (s1.course[input.name] = input.value);
    this.setState(s1);
  };
  updateCBs = (arr, checked, value) => {
    if (checked) arr.push(value);
    else {
      let index = arr.findIndex((val) => val === value);
      if (index >= 0) arr.splice(index, 1);
    }
    return arr;
  };
  handleUpdate = (e) => {
    e.preventDefault();
    this.props.onUpdate(this.state.course);
  };
  makeCBs = (arr, values, name, label) => {
    return (
      <div className="row">
        <div className="col-12">
          <label className="form-check-label font-weight-bold">
            {label} <span className="text-danger">*</span>
          </label>
        </div>
        {arr.map((opt, index) => (
          <div className="col-12" key={index}>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                value={opt}
                name={name}
                checked={values.find((val) => val === opt)}
                onChange={this.handleChange}
              />
              <label className="form-check-label">{opt}</label>
            </div>
          </div>
        ))}
      </div>
    );
  };
  makeTextField = (name, value, label, placeholder, errors = "") => {
    return (
      <div className="row">
        <div className="col-12">
          <label>{label}</label>
        </div>
        <div className="col-12">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  };
  render() {
    let { course, faculties } = this.props;
    let { name, code, description, faculty } = course;
    return (
      <div className="container">
        <h4>Add Faculty to a Course</h4>
        <hr />
        <h5>Edit the Course</h5>
        {this.makeTextField("name", name, "Name", "Enter Course Name")}
        {this.makeTextField("code", code, "Course Code", "Enter Course Code")}
        {this.makeTextField(
          "description",
          description,
          "Description",
          "Enter Course description"
        )}
        {this.makeCBs(faculties, faculty, "faculty", "Faculty")}
        <button className="btn btn-primary" onClick={this.handleUpdate}>
          Update
        </button>
      </div>
    );
  }
}
export default EditCourse;
