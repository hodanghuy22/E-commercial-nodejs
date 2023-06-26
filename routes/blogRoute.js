const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, likeTheBlog, dislikeTheBlog, uploadImages } = require('../controller/blogCtrl');
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImages');
const router = express.Router()

router.post('/',authMiddleware, isAdmin, createBlog)
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images',2),blogImgResize, uploadImages)
router.put('/likes',authMiddleware, likeTheBlog)
router.put('/dislikes',authMiddleware, dislikeTheBlog)
router.put('/:id',authMiddleware, isAdmin, updateBlog)
router.get('/:id', getBlog)
router.get('/', getAllBlog)
router.delete('/:id',authMiddleware, isAdmin, deleteBlog)

module.exports = router;