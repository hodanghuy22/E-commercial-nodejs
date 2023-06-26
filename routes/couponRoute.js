const express = require("express")
const router = express.Router();
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const { createCoupon, getAllCoupons, updateCoupon, deleteCoupon } = require("../controller/couponCtrl");


router.post('/',authMiddleware, isAdmin, createCoupon)
router.get('/',authMiddleware, isAdmin,getAllCoupons)
router.put('/:id',authMiddleware, isAdmin,updateCoupon)
router.delete('/:id',authMiddleware, isAdmin,deleteCoupon)


module.exports = router;