import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { Navbar, Form, NavDropdown, Button, Nav } from "react-bootstrap";
class ShowNavbar extends Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <Navbar style={{ backgroundColor:"#1976d2"}} expand="lg">
          <Navbar.Brand className="text-light">
            <Nav.Link>
              <Link to={user && user.role === "admin" ? "/admin" : user && user.role === "student" ? "/student" : user && user.role === "faculty" ? "/faculty" : "/login" } className="text-light">
                E-LEARNING
              </Link>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {user && user.role === "admin" && (
                <Nav.Link>
                  <Link to="/register" className="text-light">
                    Register
                  </Link>
                </Nav.Link>
              )}
              {user && user.role === "admin" && (
                <NavDropdown title="Assign"  id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/studentCourse" className="text-dark">
                      Student to Course
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/facultyCourse" className="text-dark">
                      Faculty to Course
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {user && user.role === "admin" && (
                <NavDropdown title="View" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/allStudents?page=1" className="text-dark">
                      All Students
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/allFaculties?page=1" className="text-dark">
                      All Faculties
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {user && user.role === "student" && (
                <Nav.Link>
                  <Link to="/studentDetails" className="text-light">
                    Student Details
                  </Link>
                </Nav.Link>
              )}
              {user && user.role === "student" && (
                <Nav.Link>
                  <Link to="/allClasses" className="text-light">
                    All Classes
                  </Link>
                </Nav.Link>
              )}
              {user && user.role === "student" && (
                <Nav.Link>
                  <Link to="/courseStudent" className="text-light">
                    All Courses
                  </Link>
                </Nav.Link>
              )}
              {user && user.role === "faculty" && (
                <Nav.Link>
                  <Link to="/courseAssigned" className="text-light">
                    Courses
                  </Link>
                </Nav.Link>
              )}
              {user && user.role === "faculty" && (
                <NavDropdown title="Class Details" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/scheduleClass" className="text-dark">
                      Schedule a Class
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/scheduledClasses" className="text-dark">
                      All Scheduled Classes
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Form inline>
              {user ? (
                <p className="mb-0 mx-3 text-light">
                  Welcome {user.name === "ABC" ? "Admin" : user.name}
                </p>
              ) : (
                ""
              )}
              {user ? (
                <Link to="/logout">
                  <Button variant="outline-light">
                    Logout <i className="fas fa-sign-in"></i>
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="outline-light">
                    Login <i className="fas fa-sign-in"></i>
                  </Button>
                </Link>
              )}
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}
export default ShowNavbar;
