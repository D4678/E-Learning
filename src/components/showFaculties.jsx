import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import queryString from "query-string";
import http from "./httpService";
import LeftPanel from "./leftPanel";
class ShowFaculties extends Component {
  state = {
    data: {},
    courses: [],
  };
  async fetchdata() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);
    let response = await http.get(`/getFaculties?${searchStr}`);
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
    this.callURL("/allFaculties", options);
  };
  handlePage = (incr) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    let newPage = +page + incr;
    queryParams.page = newPage;
    this.callURL("/allFaculties", queryParams);
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
            <h4 className="my-5 mb-0">All Faculties</h4>
            <p>
              {startIndex + 1} - {endIndex + 1} of {totalNum}
            </p>
            <div className="row text-light" style={{ backgroundColor: "#1976d2" }}>
              <div className="col-4">Id</div>
              <div className="col-4">Name</div>
              <div className="col-4">Courses</div>
            </div>
            {items.map((st, index) => (
              <div className="row bg-light border">
                <div className="col-4">{st.id}</div>
                <div className="col-4">{st.name}</div>
                <div className="col-4">
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
export default ShowFaculties;
