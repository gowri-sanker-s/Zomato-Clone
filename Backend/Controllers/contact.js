const { log } = require('console');
const contact = require('../Models/contactus')

exports.getDetails = async (req,res) => {
    const {name, email,  content} = req.body;
    console.log(name,email,content)
    if(!name || !email || !content){

    }
    try {
        const newDetails = new contact({
            name,
            email,
            content
        });

        const savedDetails = await newDetails.save();
        res.status(200).json(savedDetails);
    } catch (error) {
        res.status(500).send({message:"Error Occoured"})

    }
}