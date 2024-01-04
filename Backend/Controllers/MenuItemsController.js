const Menuitems = require("../Models/Menu-items");
const Restaurant = require("../Models/restaurantModel");


exports.getAllMenuItems = async (req, res) => {
  const result = await Menuitems.find();
  try {
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
/* exports.getMenuItemsByRestaurant = async(req, res) => {
    const result = await Menuitems.find({restaurant_id : req.params.id});
    try{
        res.status(200).json(result);
    }catch(err){
        res.status(500).send(err);
    }
} */
exports.getMenuItemsByRestaurantId = async (req, res) => {
  try {
    const resId = req.params.id;
    console.log("passed restaurant Id : ", resId)
    // Use the restaurantId to fetch menu items
    const menuItems = await Menuitems.find({ restaurant_id: resId });

    if (!menuItems || menuItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No menu items found for this restaurant" });
    }

    return res.status(200).json(menuItems);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
