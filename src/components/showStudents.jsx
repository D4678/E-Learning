import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import queryString from "query-string";
import http from "./httpService";
import LeftPanel from "./leftPanel";
class ShowStudents extends Component {
  state = {
    data: {},
    courses: [],
  };
  async fetchdata() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);
    let response = await http.get(`/getStudents?${searchStr}`);
    let courses = await http.get(`/getCourses`);
    let { data } = response;
    this.setState({ data: data, courses: courses.data });
    console.log(response);
  }
  componentDidMount() {
    this.fetchdata();
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.fetchdata();
  }
  handleOptionChange = (options) => {
    this.callURL("/allStudents", options);
  };
  handlePage = (incr) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    let newPage = +page + incr;
    queryParams.page = newPage;
    this.callURL("/allStudents", queryParams);
  };
  callURL = (url, options) => {
    let searchStr = this.makeSearchString(options);
    this.props.history.push({ pathname: url, search: searchStr });
  };
  makeSearchString = (options) => {
    let { page, course } = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "page", page);
    searchStr = this.addToQueryString(searchStr, "course", course);
    return searchStr;
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;
  render() {
    let { data = {}, courses = [] } = this.state;
    let { items = [], page = "", totalItems = "", totalNum = "" } = data;
    let queryParams = queryString.parse(this.props.location.search);
    let size = 3;
    let pageNum = page;
    let startIndex = (pageNum - 1) * size;
    let endIndex = startIndex + totalItems - 1;
    return (
      <div className="container">
        <div className="row">
          <div className="col-3 my-5">
            <LeftPanel
              options={queryParams}
              courses={courses}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-9">
            <h4 className="my-5 mb-0">All Students</h4>
            <p>
              {startIndex + 1} - {endIndex + 1} of {totalNum}
            </p>
            <div className="row text-light" style={{ backgroundColor: "#1976d2" }}>
              <div className="col-2">Id</div>
              <div className="col-2">Name</div>
              <div className="col-2">Date of Birth</div>
              <div className="col-3">About</div>
              <div className="col-3">Courses</div>
            </div>
            {items.map((st, index) => (
              <div className="row bg-light border" key={index}>
                <div className="col-2">{st.id}</div>
                <div className="col-2">{st.name}</div>
                <div className="col-2">{st.dob}</div>
                <div className="col-3">{st.about}</div>
                <div className="col-3">
                  {st.courses.map((c1) => (
                    <div>{c1}</div>
                  ))}
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-2">
                {pageNum > 1 ? (
                  <button
                    className="btn btn-secondary m-1 btn-sm"
                    onClick={() => this.handlePage(-1)}
                  >
                    Previous
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="col-2 offset-8 text-right">
                {totalNum > endIndex + 1 ? (
                  <button
                    className="btn btn-secondary btn-sm m-1"
                    onClick={() => this.handlePage(1)}
                  >
                    Next
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ShowStudents;
