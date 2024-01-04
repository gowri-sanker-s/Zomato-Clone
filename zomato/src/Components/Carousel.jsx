import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export class Carousel extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <div>
            <img src="/Assets/zom1.jpg" height={500} />
          </div>
          <div>
            <img src="/Assets/zom2.jpg" height={500} />
          </div>
          <div>
            <img src="/Assets/zom3.jpg" height={500} />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Carousel;
