import React from "react";
import axios from "axios";
import "../Styles/wallpaper.css";

import { withRouter } from "react-router-dom";
class Wallpaper extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      inputText: "",
      suggestions: [],
    };
  } 
  handleLocation = (event) => {
    const loc_id = event.target.value;
    sessionStorage.setItem("locationId", loc_id);
    axios
      .get(`http://localhost:8900/restaurants/location/${loc_id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ restaurants: res.data });
      })
      .catch((err) => console.log("err"));
  };
  handleSearch = (event) => {
    const inputText = event.target.value;
    const { restaurants } = this.state;

    if (restaurants) {
      const suggestions = restaurants.filter((data) =>
        data.name.toLowerCase().includes(inputText.toLowerCase())
      );
      console.log(this.state.restaurants);

      this.setState({ suggestions, inputText });
    }
  };
  showSuggestions = () => {
    const { suggestions, inputText } = this.state;

    if (suggestions.length === 0 && inputText === undefined) {
      return null;
    }
    if (suggestions.length > 0 && inputText === "") {
      return null;
    }
    if (suggestions.length === 0 && inputText) {
      return (
        <ul>
          <li>No search Found</li>
        </ul>
      );
    }
    return (
      <ul>
        {suggestions.map((data, index) => (
          <li key={index} onClick={() => this.selectingRestaurant(data)}>
            {`${data.name} , ${data.locality}`}
          </li>
        ))}
      </ul>
    );
  };
  selectingRestaurant = (resObj) => {
    console.log("Selected Restaurant:", resObj);
    const url = `/details?restaurantId=${resObj._id}`;
    console.log("Redirecting to URL:", url);
    this.props.history.push(url);
    window.location.reload();
  };

  render() {
    const { locationData, inputText } = this.props;
    return (
      <div>
        <div className="top-section">
          <img  className="home-bg-img" src="./Assets/new-background.jpg" alt="no"/>
          <div className="logo-part">
            <div className="logo">
              <img src="./Assets/ed_logo.png" alt="" width="70" height="70" />
            </div>
            <div className="desc">
              <h2 className="desc-head">
                Find the best Restaurants, Cafe's and Bars
              </h2>
            </div>
            <div className="input-fields">
              <div className="form-loc">
                <form>
                  <select id="loc" onChange={this.handleLocation}>
                    <option value="0">---Select---</option>
                    {locationData.map((data, index) => {
                      return (
                        <option key={index} value={data.location_id}>
                          {data.name},{data.city}
                        </option>
                      );
                    })}
                  </select>
                </form>
              </div>
              <div className="rest-search">
                <input
                  type="text"
                  placeholder="Enter Restaurants / Dishes name"
                  id="box"
                  onChange={this.handleSearch}
                />
                <div className="suggestionList">{this.showSuggestions()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Wallpaper);
