const MenuItem = require("../models/MenuItem");

const list = async (req, res, next) => {
    try{
        const items = await MenuItem.find();
        if(!items) return res.status(404).json({message:"Item not found"});
        res.status(200).json(items);
    } catch(err){
        next(err);
    }
}

const getItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if(!item) return res.status(404).json({message:"Item not found"});
        res.json(item);
    } catch (error) {
        next(err)
    }
}

const createItem = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const item = await MenuItem.create({
      name: req.body.name,
      price: req.body.price,
      image: imageUrl,
      description:req.body.description
    });

    await item.save();

    res.status(201).json({
      message: 'New MenuItem saved!',
      item: item
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



const updateItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true } );
        if (!item) return res.status(404).json({messae: "Colud Not Find Item To Update!"});
        res.json(item);
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        if(!item) return res.status(402).json({message: "Could Not Find Item To Delete!"})
    } catch (err) {
        next(err);
    }
};

module.exports = { list, getItem, createItem, updateItem, remove };