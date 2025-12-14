const express = require("express");
const router = express.Router();
const { list, getItem, createItem, updateItem, remove } = require("../controllers/menuController");
const authM = require("../middleware/authMiddleware");
const adminM = require("../middleware/adminMiddleware");

router.get('/menu', list);
router.get('/menu/:id', getItem);
router.post('/menu', authM, adminM, createItem);
router.put('/menu/:id', authM, adminM, updateItem);
router.delete('/menu/:id', authM, adminM, remove);



module.exports = router;