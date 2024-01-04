import React, { Component } from "react";
import "../Styles/headerStyle.css";
import Modal from "react-modal";
import GoogleLogin from "google-login";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { faScroll,faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
/*  */
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: "",
      display: "none",
      loginModalIsOpen: false,
      signupModalIsOpen: false,
      userUpdateModalIsOpen: false,
      isLoggedIn: false,
      loggedUser: undefined,
      loginEmail: "",
      loginPassword: "",
      userFullName: "",
      user: null,
      orders: [],
      userEmail: ''
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("user");
    console.log("Token : ", token);

    if (token) {
      const decodedUser = jwt_decode(token);
      console.log("user email", decodedUser.email);
      this.setState({
        isLoggedIn: true,
        loggedUser: decodedUser.name,
        user: decodedUser,
        userEmail: decodedUser.email
      });
    }
    const initalPath = this.props.history.location.pathname;
    this.setHeader(initalPath);
  }
  setHeader = (initalPath) => {
    let bg = "",
      display;
    if (initalPath === "/" || initalPath === "/home") {
      bg = "navy";
      display = "none";
    } else {
      bg = "colored";
      display = "inline-block";
    }
    this.setState({
      backgroundStyle: bg,
      display: display,
    });
  };
  HandleLogin = () => {
    this.setState({ loginModalIsOpen: true });
  };
  HandleSignup = () => {
    this.setState({ signupModalIsOpen: true });
  };
  handleCancel = () => {
    this.setState({ loginModalIsOpen: false, signupModalIsOpen: false });
  };
  logoutHandle = () => {
    localStorage.clear();
    this.setState({ isLoggedIn: false, loggedUser: undefined });
    this.props.history.push('/')
    window.location.reload();
    alert(`Logout Successfull`);
  };
  navigate = (path) => {
    this.props.history.push(path);
    window.location.reload();
  };
  handleGoogle = (response) => {
    var userObj = jwt_decode(response.credential);
    this.setState({
      isLoggedIn: true,
      loggedUser: userObj.name,
      loginModalIsOpen: false,
    });
    alert(`${userObj.given_name} signed in succesfuly`);
  };

  loginToAccount = () => {
    const { loginEmail, loginPassword } = this.state;

    const payload = {
      email: loginEmail,
      password: loginPassword,
    };

    axios
      .post(`http://localhost:8900/login`, payload)
      .then((response) => {
        console.log("logged user : ", response.data);
        console.log("Response from server:", response.data);
        if (
          response.data &&
          response.data.status === "ok" &&
          response.data.user
        ) {
          // Login was successful
          const token = response.data.user;
          console.log("Token received:", token);
          const decodedUser = jwt_decode(token);
          console.log("Decoded user:", decodedUser);
          this.setState({
            isLoggedIn: true,
            loggedUser: decodedUser.name,
            loginModalIsOpen: false,
            user: decodedUser,
          });
          localStorage.setItem("user", token);
          window.location.reload();
          alert("Login successful");
        } else {
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please try again with valid credentials.");
      });
  };

  signupToAccount = () => {
    const { loginEmail, loginPassword, userFullName } = this.state;

    const payload = {
      fullname: userFullName,
      email: loginEmail,
      password: loginPassword,
    };

    axios
      .post(`http://localhost:8900/signup`, payload)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          alert("Signup successful");
          this.setState({
            signupModalIsOpen: false,
            loginModalIsOpen: true,
          });
        } else {
          alert("Signup failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Signup failed:", error);
        alert("Signup failed. Please try again later.");
      });
  };
  showHistory = () => {
    const token = localStorage.getItem("user");
    const decode = jwt_decode(token);
    const username = decode.name;
    console.log(username);

    this.props.history.push(`/orderHistory/${username}`);
    window.location.reload();
  };
  userUpdate = () => {
    const { userEmail } = this.state;
    console.log("updateUser , Header Component",userEmail);
    axios
      .get(`http://localhost:8900/getUser/${userEmail}`)
      .then((res) => {
        const loggedUserId = res.data._id;
        console.log("updateuser Id : ", loggedUserId);
        this.props.history.push(`/updateUserPage/${loggedUserId}`);
        window.location.reload();
      })
      .catch((error) => console.log(error));

  };
  render() {
    const {
      backgroundStyle,
      display,
      loginModalIsOpen,
      signupModalIsOpen,
      isLoggedIn,
      loggedUser,
      userFullName,
      loginEmail,
      loginPassword,
    } = this.state;
    return (
      <div
        className="header"
        style={{
          backgroundColor: backgroundStyle === "navy" ? "#CC202E" : "#CC202E",
        }}
      >
        <div
          className="header-logo"
          style={{ display: display }}
          onClick={() => this.navigate("/")}
        >
          <p>e!</p>
        </div>
        {!isLoggedIn ? (
          <div className="user-acc">
            <div className="login" onClick={this.HandleLogin}>
              Login
            </div>
            <div className="signup" onClick={this.HandleSignup}>
              Create an Account
            </div>
          </div>
        ) : (
          <div className="user-acc">
            <div className={` ${isLoggedIn ? "logged" : "login"}`}>
              {loggedUser}
            </div>
            <button onClick={this.userUpdate} className="userBtn"><FontAwesomeIcon icon={faUser} /></button>
            <button onClick={this.showHistory} className="historyBtn">
              <FontAwesomeIcon icon={faScroll} />
            </button>
            <div className="signup loggedout" onClick={this.logoutHandle}>
              Logout
            </div>
          </div>
        )}

        <Modal
          isOpen={loginModalIsOpen}
          style={customStyles}
          appElement={document.getElementById("root")}
        >
          <div>
            <div className="login-popup">
              <div className="top-login-modal">
                <h2 style={{ textAlign: "center" }}>Login</h2>
                <button className="close-btn" onClick={this.handleCancel}>
                  X
                </button>
              </div>
              <div className="login-input-fields">
                <form>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => {
                      this.setState({ loginEmail: e.target.value });
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => {
                      this.setState({ loginPassword: e.target.value });
                    }}
                  />
                </form>
              </div>
              <div className="primary-btns">
                <button className="login1" onClick={this.loginToAccount}>
                  Login
                </button>
                <button className="cancel" onClick={this.handleCancel}>
                  Cancel
                </button>
              </div>
              <div className="secondary-btns">
                <GoogleLogin
                  config={{
                    client_id:
                      "1086080897675-603hcr0h1kk1u90d1nc4djpgkieca1tb.apps.googleusercontent.com",
                    callback: this.handleGoogle,
                  }}
                  btnConfig={{
                    type: "standard",
                    theme: "filled_blue",
                    size: "large",
                    text: "signin_with",
                    shape: "rectangular",
                  }}
                />{" "}
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={signupModalIsOpen}
          style={customStyles}
          appElement={document.getElementById("root")}
        >
          <div>
            <div className="login-popup">
              <div className="top-login-modal">
                <h2 style={{ textAlign: "center" }}>Signup</h2>
                <button className="close-btn" onClick={this.handleCancel}>
                  X
                </button>
              </div>
              <div className="login-input-fields">
                <form>
                  <input
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => {
                      this.setState({ userFullName: e.target.value });
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => {
                      this.setState({ loginEmail: e.target.value });
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => {
                      this.setState({ loginPassword: e.target.value });
                    }}
                  />
                </form>
              </div>
              <div className="primary-btns">
                <button className="login1" onClick={this.signupToAccount}>
                  Signup
                </button>
                <button className="cancel" onClick={this.handleCancel}>
                  Cancel
                </button>
              </div>
              <div className="secondary-btns"></div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
