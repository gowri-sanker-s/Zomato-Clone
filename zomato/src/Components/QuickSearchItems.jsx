import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
class QuickSearchItems extends Component{
  handleClick=(mealtype)=>{
    const locationId = sessionStorage.getItem('locationId')

    if(locationId){
      this.props.history.push(`/filter?mealtype=${mealtype}&location=${locationId}`)
      window.location.reload();

    }else{
      this.props.history.push(`/filter?mealtype=${mealtype}`)
      window.location.reload();

    }
  }
  render(){
    const{title,imgSrc,description,mealtype} = this.props;

    return ( 
      <div>
        <div className="rest" onClick={()=>this.handleClick(mealtype)}>
          <div className="img2">
            <img src={imgSrc} alt="" width="120" height="120" />
          </div>
          <div className="food-det"> 
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  
  }
}
export default withRouter(QuickSearchItems)