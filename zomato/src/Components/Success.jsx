import React, { Component } from "react";
import "../Styles/sandc.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export class Success extends Component {
  render() {
    return (
      <div className="success">
        <div className="sub-suc">
          <div className="inner-suc"><FontAwesomeIcon icon={faCircleCheck} /></div>
          <p className="orderDel">Your order will be delivered soon...</p>
          <button
            className="back"
            onClick={() => {
              this.props.history.push("/");
              window.location.reload();
            }}
          >
            Go back Home
          </button>
        </div>

      </div>
    );
  }
}

export default Success;
