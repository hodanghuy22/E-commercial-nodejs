const express = require('express');
const { createProduct, getAProduct, getAllProduct, updateProduct, deleteProduct, addToWishList, rating, uploadImages } = require('../controller/productCtrl');
const router = express.Router();
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');

// Phải đặt các tuyến có cùng Phương thức trước các tuyến có cùng phương thức nhưng có :id ví dụ là router.put để tránh bị xung đột
router.post('/',authMiddleware, isAdmin, createProduct)
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images',10),productImgResize, uploadImages)
router.get('/:id', getAProduct)
router.put('/wishlist', authMiddleware, addToWishList )
router.put('/rating', authMiddleware, rating )
router.put('/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id',  authMiddleware, isAdmin, deleteProduct)
router.get('/', getAllProduct)

module.exports = router;