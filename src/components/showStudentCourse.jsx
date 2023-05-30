import React, { Component } from "react";
import http from "./httpService";
class ShowStudentCourse extends Component {
  state = { course: [] };
  async componentDidMount() {
    let { user } = this.props;
    let response = await http.get(`/getStudentCourse/${user.name}`);
    console.log(response);
    this.setState({ course: response.data });
  }
  render() {
    let { course = [] } = this.state;
    return (
      <div className="container">
        <h4 className="my-5 text-center">Courses Assigned</h4>
        <div className="row text-light" style={{ backgroundColor: "#1976d2" }}>
          <div className="col-2">Course Id</div>
          <div className="col-3">Course Name</div>
          <div className="col-3">Course Code</div>
          <div className="col-4">Description</div>
        </div>
        {course.map((c1) => (
          <div className="row border bg-light" key={c1.courseId}>
            <div className="col-2">{c1.courseId}</div>
            <div className="col-3">{c1.name}</div>
            <div className="col-3">{c1.code}</div>
            <div className="col-4">{c1.description}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default ShowStudentCourse;
