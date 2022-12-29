const express = require("express");
const {
    registerUser,
    authUser,
    allUsers
  
  } = require("../controllers/UserController");
  const { protect } = require("../middlewares/AuthMiddleware");

const router = express.Router();


// router.route("/").post(registerUser);
// router.route("/").get(allUsers);


router.route("/").post(registerUser).get(protect,allUsers);


router.route("/login").post(authUser);


module.exports = router;