const express = require("express")
const router = express.Router();
const {createUser,loginUserCtrl, getAllUSer, getAUser, deleteAUser, updateAUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus} = require("../controller/userCtrl");
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");

router.post('/register',createUser);
router.post('/forgot-passwort-token', forgotPasswordToken)
router.put('/reset-password/:token', resetPassword)
router.put('/order/update-order/:id',authMiddleware,isAdmin, updateOrderStatus)

router.put('/password',authMiddleware,updatePassword);
router.post('/login',loginUserCtrl);
router.post('/admin-login',loginAdmin);
router.post('/cart', authMiddleware, userCart);
router.post('/cart/applycoupon',authMiddleware,applyCoupon)
router.post('/cart/cash-order',authMiddleware,createOrder)

router.get('/all-users', getAllUSer);
router.get('/get-orders',authMiddleware, getOrders);
router.get('/refresh',handleRefreshToken);
router.get('/logout',logout);
router.get('/wishlist',authMiddleware, getWishlist);
router.get('/cart',authMiddleware, getUserCart);

router.get('/:id',authMiddleware,isAdmin, getAUser);
router.delete('/emty-cart',authMiddleware, emptyCart)
router.delete('/:id', deleteAUser);

router.put('/edit-user',authMiddleware , updateAUser);
router.put('/save-address',authMiddleware , saveAddress);
router.put('/block-user/:id',authMiddleware ,isAdmin, blockUser);
router.put('/unblock-user/:id',authMiddleware ,isAdmin, unblockUser);

module.exports = router;