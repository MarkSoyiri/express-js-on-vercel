const express = require("express");
const router = express.Router();
const { list, getItem, createItem, updateItem, remove } = require("../controllers/menuController");
const authM = require("../middleware/authMiddleware");
const adminM = require("../middleware/adminMiddleware");

router.get('/', list);
router.get('/:id', getItem);
router.post('/', authM, adminM, createItem);
router.put('/:id', authM, adminM, updateItem);
router.delete('/:id', authM, adminM, remove);

module.exports = router;