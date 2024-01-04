import React, { Component } from 'react'
import "../Styles/sandc.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'


export class Cancel extends Component {
  render() {
    return (
      <div className="success">
        <div className="sub-suc">
          <div className="cancel-inner-suc"><FontAwesomeIcon icon={faBan} /></div>
          <p className="orderDel">An error Occured</p>
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

      </div>    )
  }
}

export default Cancel