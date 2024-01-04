import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Modal from "react-modal";
import "../Styles/details.css";
import Footer from "./Footer";
import Spinner from "./Spinner";
import OrderHistory from "./OrderHistory";
import jwtDecode from "jwt-decode";

const stripePromise = loadStripe(
  "pk_test_51O5SWgSDazQDrMhocoOeTRVIZoc7wcQn4c4Fm0EluiUc2otwxRHunKRUE4ThjiOenjeq1GmrSZdOXOKIVknfW4JQ00wN0x9tY0"
);
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.891)",
    height: "60vh",
    overflowY: "auto",
  },
};

class Details extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: {},
      menuItems: [],
      menuItemModalIsOpen: false,
      paymentProceedModal: false,
      paymentProceedModalIsOpen: false,
      resId: undefined,
      subTotal: 0,
      username: localStorage.getItem("user"),
      cart: [],
      orderHistory: [],
      newOrderHistory:[],
      loading: false,
      loggedUserFullName: ''
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    const token = localStorage.getItem("user");
    let decodedUser;

    if (token) {
       decodedUser = jwtDecode(token);
       if(decodedUser){
         this.setState({
           loggedUserFullName: decodedUser.name,
         });
         //------------------------------------------//
         axios.get(`http://localhost:8900/order/${decodedUser.name}`)
         .then((res)=>{
           this.setState({newOrderHistory: res.data})
         })

         //------------------------------------------//
       }
      
    } 


    const searchParams = queryString.parse(this.props.location.search);
    const restauratId = searchParams.restaurantId;

    axios
      .get(`http://localhost:8900/restaurant/${restauratId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        this.setState({
          restaurant: res.data,
          resId: restauratId,
          loading: false,
        });
        //console.log(res.data);
      })
      .catch((err) => console.log(err));

/*       */
  }

  handleModal = (stateName, value) => {
    const { resId } = this.state;
    if (stateName === "menuItemModalIsOpen" && value === true) {
      axios
        .get(`http://localhost:8900/getmenu/${resId}`)
        .then((response) => {
          this.setState({
            menuItems: response.data,
          });
          console.log(response.data);
        })
        .catch((error) => {
          console.error("An error occoured", error);
        });
    }
    this.setState({ [stateName]: value });
  };

  addItems = (index, operationType) => {
    let total = 0;
    const items = [...this.state.menuItems];
    const item = items[index];

    if (operationType === "add") {
      item.qty += 1;
    } else {
      item.qty -= 1;
    }

    items[index] = item;
    items.map((item) => {
      return (total += item.qty * item.price);
    });

    this.setState({ menuItems: items, subTotal: total });
  };
  addToCart = (item) => {
    const { cart } = this.state;
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      updatedCart.push({ ...item, qty: 1 });
    }

    this.setState({ cart: updatedCart });
    console.log(cart);
  };

  removeFromCart = (item) => {
    const { cart } = this.state;
    const updatedCart = [...cart];

    const existingItem = updatedCart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      existingItem.qty -= 1;

      if (existingItem.qty === 0) {
        const index = updatedCart.findIndex(
          (cartItem) => cartItem.id === item.id
        );
        if (index !== -1) {
          updatedCart.splice(index, 1);
        }
      }

      this.setState({ cart: updatedCart });
    }
  };


  makePayment = async () => {
    const { cart, subTotal, username, loggedUserFullName } = this.state;
  
    const customerName = loggedUserFullName;
  
    try {

      const orderResponse = await axios.post("http://localhost:8900/history", {
        customerName,
        cart,
        subTotal,
      });
  

      if (orderResponse.status === 200) {
        const stripe = await loadStripe(
          "pk_test_51O5SWgSDazQDrMhocoOeTRVIZoc7wcQn4c4Fm0EluiUc2otwxRHunKRUE4ThjiOenjeq1GmrSZdOXOKIVknfW4JQ00wN0x9tY0"
        );
  
        const body = { products: cart };
        const paymentResponse = await fetch("http://localhost:8900/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
  
        const session = await paymentResponse.json();
  
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
  
        if (result.error) {

          console.log("Payment failed:", result.error);
 
          await axios.delete(`http://localhost:8900/history/${orderResponse.data._id}`);
        }
      } else {

        console.log("Order creation failed");
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };
  
  render() {
    const {
      restaurant,
      menuItemModalIsOpen,
      menuItems,
      subTotal,
      username,
      orderHistory,
      loading,
      newOrderHistory
    } = this.state;
    console.log("State:", this.state.newOrderHistory);
    //----------------------------------------------------//

    let discountedSubTotal; 
    if(newOrderHistory.length > 4 ){
      discountedSubTotal = Math.floor(0.8 * subTotal)
      console.log(discountedSubTotal);
    }
    
    //----------------------------------------------------//

    return (
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <img
              src="./Assets/zomato-wall-det3.jpg"
              alt=""
              height={500}
              className="imageDetails"
            />
            <div className="contentDetails">
              <div>
                <h2 className="restaurantName">{restaurant.name}</h2>
                {!username ? (
                  <div className="loginto-order">Login to place the order</div>
                ) : (
                  <button
                    className="placeOrderbtn"
                    onClick={() => {
                      this.handleModal("menuItemModalIsOpen", true);
                    }}
                  >
                    Place Order
                  </button>
                )}
              </div>
              <Tabs>
                <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Contact</Tab>

                </TabList>

                <TabPanel>
                  <h4 className="restHead">About this Place</h4>
                  <h5 className="restCity">
                    {restaurant.city}, {restaurant.locality}
                  </h5>
                  <h5 className="restRating">
                    Rating:{" "}
                    <span className="ratingNumber">
                      {" "}
                      {restaurant.rating_text}{" "}
                    </span>
                  </h5>
                  <h5 className="costHead">
                    Cost for Two:{" "}
                    <span className="costPrice"> ₹{restaurant.min_price}</span>
                  </h5>
                </TabPanel>
                <TabPanel>
                  <h2 className="restaurantNameTab">{restaurant.name}</h2>
                    <img src={restaurant.image} alt="N/A" height={200} width={200}/>
                  <h4 className="phno">
                    ph.no : <b>{restaurant.contact_number}</b>{" "}
                  </h4>
                </TabPanel>

              </Tabs>

              <Modal
                isOpen={menuItemModalIsOpen}
                style={customStyles}
                ariaHideApp={false}
              >
                <div className="modal-content">
                  <button
                    className="menu-modal-x"
                    onClick={() =>
                      this.handleModal("menuItemModalIsOpen", false)
                    }
                  >
                    X
                  </button>
                  <div className="modalClass">
                    <div className="restName">{restaurant.name}</div>
                    <div className="subtotal">
                      Your SubTotal :{" "}
                      {/* <strong className="totalCost">{subTotal}</strong> */}
                      {/* -------------------------------------------------------------------------- */}

                      <strong className="totalCost">{discountedSubTotal? discountedSubTotal : subTotal}</strong> 
                      <p className={discountedSubTotal ? 'additionalTotal' : 'noTotal'}>Regular Price : {subTotal}</p> 

                      {/* -------------------------------------------------------------------------- */}
                    </div>
                    <button
                      className="payNowBtn"
                      onClick={() => {
                        this.handleModal("menuItemsModalIsOpen", false);

                        this.makePayment();
                      }}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
                {menuItems.map((item, index) => {
                  return (
                    <div className="modalInside" key={index}>
                      <div className="nameDesc">
                        <div className="itemName">{item.name}</div>
                        <div className="itemDesc">{item.description}</div>
                      </div>
                      <div className="priceClass">&#8377;{item.price}</div>
                      <div className="picAdd">
                        <div className="imgClass">
                          <img
                            src={`./Assets/${item.image}`}
                            alt="No img"
                            className="menuImg"
                          />
                        </div>
                        {item.qty === 0 ? (
                          <div>
                            <button
                              className="addBtn"
                              onClick={() => {
                                this.addItems(index, "add");
                                this.addToCart(item);
                              }}
                            >
                              Add
                            </button>
                          </div>
                        ) : (
                          <div className="qty-btns">
                            <button
                              className="subBtn1"
                              onClick={() => {
                                this.addItems(index, "sub");
                                this.removeFromCart(item);
                              }}
                            >
                              -
                            </button>
                            <p className="itemCount"> {item.qty}</p>
                            <button
                              className="addBtn1"
                              onClick={() => {
                                this.addItems(index, "add");
                                this.addToCart(item);
                              }}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </Modal>
            </div>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Details);
