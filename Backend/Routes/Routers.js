// Import express and router
const express = require('express');
const verifyToken = require('../Middlewares/auth')
const routes = express.Router();

// Import all required controlling functions
const restuarantsController = require('../Controllers/RestaurantController');
const locationsController = require('../Controllers/locations');
const mealtypeController = require('../Controllers/mealtypes');
const menuItemsController = require('../Controllers/MenuItemsController');
const userController = require('../Controllers/userController');
const paymentController = require('../Controllers/Payment');
const orderController = require('../Controllers/orderRoute');
const contactController = require('../Controllers/contact')
// These are API end points for my project
routes.get('/locations',locationsController.getLocations);
routes.get('/mealtypes',mealtypeController.getMealtypes);
routes.post('/filter', restuarantsController.filter);
routes.get('/getmenu/:id', menuItemsController.getMenuItemsByRestaurantId);
routes.get('/menuitems', menuItemsController.getAllMenuItems);
routes.post('/restaurant/createRestaurant', restuarantsController.createRestaurant);
routes.get('/restaurant/:id', restuarantsController.getRestaurantById);
routes.get("/restaurants", restuarantsController.getAllRestuarant);
routes.get("/restaurants/:name", restuarantsController.getrestaurantByName);
routes.get('/restaurants/location/:locid', restuarantsController.getRestaurantByLocation); //changes made

routes.post('/signup', userController.signUp);
routes.post('/login', userController.logIn);
routes.post('/payment', paymentController.handlePayment);
routes.get('/getUser/:email', userController.getUser);
routes.put('/updateUser/:id', userController.updateUser);

routes.post('/history', orderController.placeOrder);
routes.delete('history/:id', orderController.deleteOrderHistory);
routes.get('/order/:customerName', orderController.getOrderHistory)

routes.post('/contactus', contactController.getDetails)
// Exporting router.
module.exports = routes; 
