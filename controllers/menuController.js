const MenuItem = require("../models/MenuItem");

const list = async (req, res, next) => {
    try{
        const items = await MenuItem.find();
        res.json(items);
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

const createItem = async (req, res, next) => {
    try {
        const payload = req.body;
        const item = await  new MenuItem(payload);
        res.status(201).json(item);
    } catch (err) {
        next(err)
    }

}

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