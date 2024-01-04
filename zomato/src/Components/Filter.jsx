import React, { Component } from "react";
import "../Styles/styles.css";
import queryString from "query-string";
import axios from "axios";
import Footer from "./Footer";
import jwt_decode from 'jwt-decode'
export default class Filter extends Component {
  constructor() {
    super();
    this.state = {
      filterHeading: [],
      restaurants: [],
      locations: [],
      mealtype: undefined,
      location: undefined,
      cuisine: [],
      lcost: undefined,
      hcost: undefined,
      sort: 1,
      page: 1,
      loggedUser: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("user");

    if (token) {
      const decodedUser = jwt_decode(token);
        this.setState({
          loggedUser: decodedUser.name,
        });
      
    } 

    const qs = queryString.parse(this.props.location.search);
    const { mealtype, location } = qs;
    this.setState({ mealtype: mealtype });
    const payload = {
      mealtype_id: parseInt(mealtype),
      location_id: parseInt(location),
    };
    axios({
      method: "POST",
      url: `http://localhost:8900/filter`,
      headers: { "Content-Type": "application/json" },
      data: payload,
    })
      .then((res) => {
        this.setState({ restaurants: res.data, mealtype });
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8900/locations", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        this.setState({ locations: res.data });
      })
      .catch((err) => console.log("err"));
  }

  handleLocation = (event) => {
    const selectedLocationId = parseInt(event.target.value);

    const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;

    const payload = {
      mealtype_id: Number(mealtype),
      location_id: selectedLocationId,
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      lcost: lcost,
      hcost: hcost,
      sort: sort,
      page: page,
    };

    axios({
      method: "POST",
      url: `http://localhost:8900/filter`,
      headers: { "Content-Type": "application/json" },
      data: payload,
    })
      .then((res) => {
        this.setState({ restaurants: res.data, location: selectedLocationId });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  handleCuisine = (cuisineName) => {
    const { mealtype, location, lcost, hcost, sort, page } = this.state;
    const { cuisine } = this.state;

    const index = cuisine.findIndex((c) => c.name === cuisineName);

    if (index === -1) {
      cuisine.push({ name: cuisineName });
    } else {
      cuisine.splice(index, 1);
    }

    const payload = {
      mealtype_id: Number(mealtype),
      location_id: location,
      cuisine: cuisine.length === 0 ? undefined : cuisine.map((c) => c.name),
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: `http://localhost:8900/filter`,
      headers: { "Content-Type": "application/json" },
      data: payload,
    })
      .then((res) => {
        this.setState({ restaurants: res.data, cuisine });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  handleCost = (lcost, hcost) => {
    const { mealtype, location, cuisine, sort, page } = this.state;

    const payload = {
      mealtype_id: Number(mealtype),
      location_id: location,
      cuisine: cuisine.length === 0 ? undefined : cuisine.map((c) => c.name),
      lcost: lcost,
      hcost: hcost,
      sort: sort,
      page: page,
    };
    axios({
      method: "POST",
      url: `http://localhost:8900/filter`,
      headers: { "Content-Type": "application/json" },
      data: payload,
    })
      .then((res) => {
        this.setState({ restaurants: res.data, lcost: lcost, hcost: hcost });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  handleSort = (sort) => {
    const { mealtype, location, cuisine, lcost, hcost, page } = this.state;
    const payload = {
      mealtype_id: Number(mealtype),
      location_id: location,
      cuisine: cuisine.length === 0 ? undefined : cuisine.map((c) => c.name),
      lcost: lcost,
      hcost: hcost,
      sort: sort,
      page: page,
    };
    axios({
      method: "POST",
      url: `http://localhost:8900/filter`,
      headers: { "Content-Type": "application/json" },
      data: payload,
    })
      .then((res) => {
        this.setState({ restaurants: res.data, sort: sort });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  handleClearFilter = () => {
    window.location.reload();
  };
  navigateToDetails = (resId) => {
    this.props.history.push(`/details?restaurantId=${resId}`);
    window.location.reload();
  }; 
  render() {
    const { restaurants, locations } = this.state;

    return (
      <div>
        <div className="main-heading">
          <h2>Find Restaurants in your area</h2>
        </div>

        <div className="container">
          <div className="bottom-section">
            <div className="bottom-left">
              <div className="filter-panel">
                <div className="filter-heading">
                  <p> Filters </p>
                  <button
                    className="clearFilter"
                    onClick={this.handleClearFilter}
                  >
                    Clear Filters
                  </button>
                </div>
                <div className="filter-sub-heading">Select Your Location</div>
                <select
                  className="locationSelection"
                  onChange={this.handleLocation}
                >
                  <option value="0">---Select---</option>
                  {locations.map((data, index) => {
                    return (
                      <option key={data._id} value={data.location_id}>
                        {data.name}, {data.city}
                      </option>
                    );
                  })}
                </select>

                <div className="filter-sub-heading">Cuisines</div>
                <input
                  type="checkbox"
                  className="cuisine-opt"
                  onChange={() => this.handleCuisine("NorthIndian")}
                />
                <label> North Indian</label>
                <br />
                <input
                  type="checkbox"
                  className="cuisine-opt"
                  onChange={() => this.handleCuisine("SouthIndian")}
                />
                <label> South Indian</label>
                <br />
                <input
                  type="checkbox"
                  className="cuisine-opt"
                  onChange={() => this.handleCuisine("FastFood")}
                />
                <label> Fast Food</label>
                <br />
                <input
                  type="checkbox"
                  className="cuisine-opt"
                  onChange={() => this.handleCuisine("Italian")}
                />
                <label> Italian</label>
                <br />
                <input
                  type="checkbox"
                  className="cuisine-opt"
                  onChange={() => this.handleCuisine("Mexican")}
                />
                <label>Mexican</label>
                <br />

                <div className="filter-sub-heading">Cost for two</div>
                <input
                  type="radio"
                  className="radio-opt"
                  name="range"
                  onChange={() => this.handleCost(1, 500)}
                />
                <label>0-Rs.500</label>
                <br />
                <input
                  type="radio"
                  className="radio-opt"
                  name="range"
                  onChange={() => this.handleCost(500, 700)}
                />
                <label>Rs.500-Rs.700</label>
                <br />
                <input
                  type="radio"
                  className="radio-opt"
                  name="range"
                  onChange={() => this.handleCost(700, 900)}
                />
                <label>Rs.700-Rs.900</label>
                <br />
                <input
                  type="radio"
                  className="radio-opt"
                  name="range"
                  onChange={() => this.handleCost(900, 1100)}
                />
                <label>Rs.900-Rs.1100</label>
                <br />
                <input
                  type="radio"
                  className="radio-opt"
                  name="range"
                  onChange={() => this.handleCost(1100, 10000)}
                />
                <label>Rs.1100-Rs.1300</label>
                <br />

                <div className="filter-sub-heading">Sort</div>
                <input
                  type="radio"
                  className="radio-opt"
                  name="price"
                  onChange={() => this.handleSort(1)}
                />
                <label>Price: Low to High</label>
                <br />
                <input
                  type="radio"
                  className="radio-opt"
                  name="price"
                  onChange={() => this.handleSort(-1)}
                />
                <label>Price: High to low</label>
                <br />
              </div>
            </div>

            <div className="bottom-right">
              <div className="result-panel">
                {restaurants.length > 0 ? (
                  restaurants.map((data, index) => {
                    return (
                      <div key={data._id}
                        className="restaurant-box"
                        onClick={() => this.navigateToDetails(data._id)}
                      >
                        <div className="result-top">
                          <div className="upper-section">
                            <img
                              src={`./${data.image}`}
                              alt=""
                              height="120"
                              width="120"
                            />
                          </div>
                          <div className="upper-right">
                            <div className="Main-heading">{data.name}</div>
                            <div className="Sub-heading">{data.locality}</div>
                            <div className="Address">{data.city}</div>
                          </div>
                        </div>

                        <div className="result-bottom">
                          <div className="lower-section">
                            <div className="itm-name">Cuisine</div>
                            <div className="cost">Cost</div>
                          </div>

                          <div className="lower-right">
                            <div className="Item">
                              {data.cuisine.map((item, index) => (
                                <span key={index}>
                                  {item.name}
                                  {index !== data.cuisine.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                            </div>
                            <div className="value">Rs.{data.min_price}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-rec">No restaurants found...</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
