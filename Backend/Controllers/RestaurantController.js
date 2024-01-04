const Restuarant = require("../Models/restaurantModel");

exports.createRestaurant = async(req,res) => {
  const {name, city, location_id, city_id, locality, thumb, aggregate_rating,rating_text, min_price, contact_number, cuisine, image, mealtype_id} = req.body;
  const payload = {
    name, 
    city, 
    location_id, 
    city_id, 
    locality, 
    thumb, 
    aggregate_rating, 
    rating_text,
    min_price, 
    contact_number, 
    cuisine, 
    image, 
    mealtype_id
  }
  try{
    const saveRestaurant = await new Restuarant(payload)
    const newRestaurant = await saveRestaurant.save();
    res.status(200).send({message:"Restaurant Created Successfuly", data: newRestaurant})
  }
  catch(error){
    res.status(500).send({message:"Internal Server error", error: error})
  }
}
// This method will return all restaurant details
exports.getAllRestuarant = async (req, res) => {
  const list = await Restuarant.find();
  try {
    res.status(200).json(list);
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.getrestaurantByName = async (req, res) => {
  const list = await Restuarant.find({ name: req.params.name });
  try {
    res.status(200).json(list);
  } catch (err) {
    res.status(500).send(err);
  }
};
// This method will returns restaurants list based on location
exports.getRestaurantByLocation = async (req, res) => {
  //const list = await Restuarant.find({location_id : req.params.id});
  const list = await Restuarant.find({ location_id: req.params.locid });

  try {
    res.status(200).json(list);
  } catch (err) {
    res.status(500).send(err);
  }
};
// This method will return restaurant details by restaurant ID.
exports.getRestaurantById = async (req, res) => {
    const restaurant = await Restuarant.findById(req.params.id);
    try{
      res.status(200).json(restaurant);
    }catch(err){
      res.status(500).send(err);
    }
  }

// This is method will return filtered restaurant based on some criteria
exports.filter = async (req, res) => {
  let { mealtype_id, location_id, cuisine, hcost, lcost, sort, page } =
    req.body;

  sort = sort ? sort : 1;
  page = page ? page : 1;

  let itemPerPage = 2;
  let startIndex = page * itemPerPage - itemPerPage;
  let endIndex = page * itemPerPage;
  console.log("req.body : ", req.body);
  let payload = {}; // Initialize an empty payload object

  if (mealtype_id) {
    payload.mealtype_id = mealtype_id;
  }

  if (location_id) {
    payload.location_id = location_id;
  }
  if (mealtype_id && location_id) {
    payload.mealtype_id = mealtype_id;
    payload.location_id = location_id;
  }


  if (cuisine && cuisine.length > 0) {
    // Use $in to match multiple cuisine names
    payload.cuisine = { $in: cuisine };
  }

  if (hcost && lcost) {
    payload.min_price = { $lte: hcost, $gte: lcost };
  }
  
  if (mealtype_id && cuisine) {
    payload.cuisine = { $elemMatch: { name: cuisine } }; 
  }

  if (mealtype_id && location_id && cuisine) {
    payload.location_id = location_id;
    payload.cuisine = { $elemMatch: { name: cuisine } }; 
  }

  if (mealtype_id && location_id && hcost && lcost) {
    payload.location_id = location_id;
    payload.min_price  = { $lte: hcost, $gte: lcost }; //
  }

  if (mealtype_id && location_id && cuisine && hcost && lcost) {
    payload.location_id = location_id;
    payload.min_price  = { $lte: hcost, $gte: lcost }; //
    payload.cuisine = { $elemMatch: { name: cuisine } }; 
  }

  console.log("payload", payload);

  try {
    let list = await Restuarant.find(payload).sort({ min_price: sort });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).send(err);
  }
};
