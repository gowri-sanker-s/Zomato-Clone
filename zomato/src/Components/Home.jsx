import React, { Component } from "react";
import "../Styles/homestyle.css";
import Wallpaper from "./Wallpaper";
import QuickSearch from "./QuickSearch";
import axios from "axios";
import Footer from "./Footer";
import Spinner from "./Spinner";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      location: [],
      mealTypes: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    sessionStorage.clear();
    axios
      .get("http://localhost:8900/locations", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        this.setState({ location: res.data, loading: false });
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8900/mealtypes", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        this.setState({ mealTypes: res.data, loading: false });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { location, mealTypes, loading } = this.state;

    return (
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="main-container">
            <Wallpaper locationData={location} />
            <QuickSearch mealTypes={mealTypes} />
            <Footer />
          </div>
        )}
      </div>
    );
  }
}
