import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import auth from "./authService";
import ShowNavbar from "./showNavbar";
import Login from "./login";
import Logout from "./logout";
import AdminPortal from "./adminPortal";
import RegisterStudent from "./registerStudent";
import ShowStudents from "./showStudents";
import ShowFaculties from "./showFaculties";
import StudentCourse from "./studentCourse";
import FacultyCourse from "./facultyCourse";
import StudentPortal from "./studentPortal";
import ShowStudentCourse from "./showStudentCourse";
import ShowStudentClasses from "./showStudentClasses";
import StudentDetails from "./studentDetails";
import FacultyPortal from "./facultyPortal";
import CourseAssigned from "./courseAssigned";
import ScheduledClasses from "./scheduledClasses";
import AddClass from "./addClass";
import NotAllowed from "./notAllowed";
class StudyPortal extends Component {
  render() {
    const user = auth.getUser();
    return (
      <React.Fragment>
        <ShowNavbar user={user} />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/admin" component={AdminPortal} />
          <Route path="/register" component={RegisterStudent} />
          <Route path="/allStudents" component={ShowStudents} />
          <Route path="/allFaculties" component={ShowFaculties} />
          <Route path="/studentCourse" component={StudentCourse} />
          <Route path="/facultyCourse" component={FacultyCourse} />
          <Route path="/student" component={StudentPortal} />
          <Route path="/faculty" component={FacultyPortal} />
          <Route
            path="/courseStudent"
            render={(props) => <ShowStudentCourse {...props} user={user} />}
          />
          <Route
            path="/courseAssigned"
            render={(props) => <CourseAssigned {...props} user={user} />}
          />
          <Route
            path="/scheduledClasses"
            render={(props) => <ScheduledClasses {...props} user={user} />}
          />
          <Route
            path="/scheduleClass"
            render={(props) => <AddClass {...props} user={user} />}
          />
          <Route
            path="/studentDetails"
            render={(props) => <StudentDetails {...props} user={user} />}
          />
          <Route
            path="/allClasses"
            render={(props) => <ShowStudentClasses {...props} user={user} />}
          />
          <Route path="/notAllowed" component={NotAllowed} />
          <Redirect from="/" to="/login" />
        </Switch>
      </React.Fragment>
    );
  }
}
export default StudyPortal;
