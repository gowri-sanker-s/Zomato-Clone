import React, { Component } from "react";
import QuickSearchItems from "./QuickSearchItems";
import "../Styles/quick.css";
import Filter from "./Filter";
export default class QuickSearch extends Component {
  render() {
    const { mealTypes } = this.props;

    return (
      <div>
        <div className="quick-section">
          <h1>
            <b>Quick Search</b>{" "}
          </h1>
          <h3>Discover restaurants by type of meals</h3>
          <div  className="quickSubHeading"></div>
          <div className="rest-cards">
            {mealTypes.map((data, index) => {
              return (
                <QuickSearchItems
                  key={index}
                  title={data.name}
                  imgSrc={data.image}
                  description={data.content}
                  mealtype={data.meal_type}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
