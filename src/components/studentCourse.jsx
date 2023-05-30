import React, { Component } from "react";
import http from "./httpService";
import EditCourse from "./editCourse";
class StudentCourse extends Component {
  state = { courses: [], view: 0, course: {}, students: [] };
  async getData() {
    let response = await http.get("/getCourses");
    let students = await http.get("/getStudentNames");
    this.setState({ courses: response.data, students: students.data });
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps, currState) {
    if (prevProps !== this.props) this.getData();
  }
  handleEdit = (course) => {
    console.log(course);
    this.setState({ view: 1, course: course });
  };
  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
  }
  handleUpdate = (course) => {
    console.log(course);
    this.putData("/putCourse", course);
    this.setState({ course: {}, view: 0 });
  };
  render() {
    let { courses = [], view, course = {}, students = [] } = this.state;
    return (
      <div className="container">
        {view === 0 ? (
          <React.Fragment>
            <h4 className="mt-2 text-center my-5">Add Students to a Course</h4>
            <div className="row text-white" style={{ backgroundColor: "#1976d2" }}>
              <div className="col-2">Course Id</div>
              <div className="col-2">Name</div>
              <div className="col-2">Course Code</div>
              <div className="col-4">Description</div>
              <div className="col-1">Students</div>
              <div className="col-1"></div>
            </div>
            {courses.map((st, index) => (
              <div className="row bg-light border" key={index}>
                <div className="col-2">{st.courseId}</div>
                <div className="col-2">{st.name}</div>
                <div className="col-2">{st.code}</div>
                <div className="col-4">{st.description}</div>
                <div className="col-1">
                  {st.students.map((c1) => (
                    <div>{c1}</div>
                  ))}
                </div>
                <div className="col-1">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => this.handleEdit(st)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </React.Fragment>
        ) : (
          <EditCourse
            course={course}
            studentsArr={students}
            onUpdate={this.handleUpdate}
          />
        )}
      </div>
    );
  }
}
export default StudentCourse;
