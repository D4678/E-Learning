import React, { Component } from "react";
import http from "./httpService";
class ShowStudentCourse extends Component {
  state = { classes: [] };
  async componentDidMount() {
    let { user } = this.props;
    let response = await http.get(`/getStudentClass/${user.name}`);
    console.log(response);
    this.setState({ classes: response.data });
  }
  render() {
    let { classes = [] } = this.state;
    return (
      <div className="container">
        <h4 className="my-5 text-center">All Scheduled Classes</h4>
        <div className="row text-light" style={{ backgroundColor: "#1976d2" }}>
          <div className="col-2">Course Name</div>
          <div className="col-2">Start Time</div>
          <div className="col-2">End Time</div>
          <div className="col-3">Faculty Name</div>
          <div className="col-3">Topic</div>
        </div>
        {classes.map((c1, index) => (
          <div className="row border bg-light" key={index}>
            <div className="col-2">{c1.course}</div>
            <div className="col-2">{c1.time}</div>
            <div className="col-2">{c1.endTime}</div>
            <div className="col-3">{c1.facultyName}</div>
            <div className="col-3">{c1.topic}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default ShowStudentCourse;
