import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpService";
import EditClass from "./editClass";
class ShowStudentCourse extends Component {
  state = { classes: [], view: 0, classObj: {} };
  async componentDidMount() {
    let { user } = this.props;
    let response = await http.get(`/getFacultyClass/${user.name}`);
    console.log(response);
    this.setState({ classes: response.data });
  }
  handleEdit = (classObj) => {
    this.setState({ classObj: classObj, view: 1 });
  };

  async putData(url, obj) {
    console.log(obj);
    try {
      let response = await http.put(url, obj);
      if (response) {
        alert("Class Updated Succesfully");
        window.location = "/scheduledClasses";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ msg: ex.response.data });
      }
    }
  }
  render() {
    let { classes = [], view, classObj = {} } = this.state;
    return (
      <div className="container">
        {view === 0 ? (
          <React.Fragment>
            {" "}
            <h4 className="my-5 text-center">All Scheduled Classes</h4>
            <div className="row text-light" style={{ backgroundColor: "#1976d2" }}>
              <div className="col-3">Course Name</div>
              <div className="col-2">Start Time</div>
              <div className="col-2">End Time</div>
              <div className="col-3">Topic</div>
              <div className="col-2"></div>
            </div>
            {classes.map((c1) => (
              <div className="row border bg-light">
                <div className="col-3">{c1.course}</div>
                <div className="col-2">{c1.time}</div>
                <div className="col-2">{c1.endTime}</div>
                <div className="col-3">{c1.topic}</div>
                <div className="col-2">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => this.handleEdit(c1)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
            <Link to="/scheduleClass">
              <button className="btn btn-primary mt-2">Add New Class</button>
            </Link>
          </React.Fragment>
        ) : (
          <EditClass classObj={classObj} putData={this.putData} />
        )}
      </div>
    );
  }
}
export default ShowStudentCourse;
