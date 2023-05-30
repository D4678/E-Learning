import React, { Component } from "react";
class LeftPanel extends Component {
  handleChange = (e) => {
    let { currentTarget: input } = e;
    let options = { ...this.props.options };
    options[input.name] = this.updateCBs(
      options[input.name],
      input.checked,
      input.value
    );
    options.page = 1;
    this.props.onOptionChange(options);
  };
  updateCBs = (inpValue, checked, value) => {
    let inpArr = inpValue ? inpValue.split(",") : [];
    if (checked) inpArr.push(value);
    else {
      let index = inpArr.findIndex((val) => val === value);
      if (index >= 0) inpArr.splice(index, 1);
    }
    return inpArr.join(",");
  };
  makeCBs = (arr, values, name, label) => {
    return (
      <div className="row">
        <div className="col-12 px-4 py-2 bg-light border">
          <label className="form-check-label font-weight-bold">{label}</label>
        </div>
        {arr.map((opt, index) => (
          <div className="col-12 border p-2" key={index}>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                value={opt.name}
                name={name}
                checked={values.find((val) => val === opt.name)}
                onChange={this.handleChange}
              />
              <label className="form-check-label">{opt.name}</label>
            </div>
          </div>
        ))}
      </div>
    );
  };
  render() {
    let { course = "" } = this.props.options;
    let { courses } = this.props;
    return (
      <div className="row mx-2">
        <div className="col-12">
          {this.makeCBs(courses, course.split(","), "course", "Options")}
        </div>
      </div>
    );
  }
}
export default LeftPanel;
