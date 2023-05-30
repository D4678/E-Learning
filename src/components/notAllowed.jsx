import React, { Component } from "react";
class NotAllowed extends Component {
  render() {
    return (
      <div className="container">
        <h6 className="text-center mt-5 text-danger display-4">
          Sorry <i class="fas fa-frown"></i> <br /> This Functionality Is Not
          Allowed..!!
        </h6>
      </div>
    );
  }
}
export default NotAllowed;
