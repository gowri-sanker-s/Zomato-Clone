import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles/orderHistory.css";
import Footer from "./Footer";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  console.log("OrderHistory component rendered");
  const { username } = useParams();
  useEffect(() => {
    console.log(username);
    axios
      .get(`http://localhost:8900/order/${username}`)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Cannot fetch the orders", error);
      });
  }, [username]);
  return (
    <div className="main-body">

      <h2 className="order-heading">Order History</h2>
      <div className="container">
        {" "}
        {orders &&
          orders.map((order) => (
            <div className="outer-order" key={order._id}>
              <ol>
                {order.items.map((item) => {
                  return (
                    <div className="inner-order" key={item._id}>
                      <li>
                        <img src={`/Assets/${item.image}`} alt="Nothing found" height={80} width={80}/>
                        <p className="name">Item name : <b className="itm">{item.name}</b> </p>
                        <p className="price">Item Price : <b className="itm">₹{item.price}</b></p>
                        <p className="qty">Quantity : <b className="itm">{item.qty}</b>nos</p>
                      </li>
                      <div className="lineC"></div>
                    </div>
                  );
                })}
              </ol>
              {/*             <h2 className="total">{order.totalAmount}</h2>
               */}{" "}
               <p className="total">Total Amount : <b className="amt">₹{order.totalAmount}</b></p>
            </div>
          ))}

      </div>
      <Footer/>
    </div>
  );
};

export default OrderHistory;
