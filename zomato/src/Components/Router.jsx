import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Filter from "./Filter";
import Details from "./Details";
import Header from "./Header";
import Order from "./OrderHistory"
import Success from "./Success";
import Cancel from "./Cancel";
import Footer from "./Footer";
import UpdateUser from "./UpdateUser";


function Router() {
  return ( 
    <BrowserRouter> 
      <Route path="*" component={Header} />
      <Route exact path="/" component={Home} />
      <Route path="/filter" component={Filter} />
      <Route path="/details" component={Details} />
      <Route path="/orderHistory/:username" component={Order}/>
      <Route path="/success" component={Success} />
      <Route path="/cancel" component={Cancel} />
      <Route path= '/footer' component={Footer}/>
      <Route path='/updateUserPage/:id' component={UpdateUser} />
    </BrowserRouter>
  );
}
export default Router;
