const express = require("express");
const router = express.Router();

const {
  resgister,
  listuser,
  readuser,
  edituser,
  removeuser,
  changStatus,
  changRole
  
} = require("../Controllers/users");


const { auth ,admin } = require("../Middleware/auth")


//listuser
router.get("/user",auth ,admin, listuser);
//listcreateuser
router.post("/user", resgister);
// readuser
router.get("/user/:id",readuser );
// edituser
router.put("/user/:id", edituser,auth);
// removeuser
router.delete("/user/:id",auth ,admin, removeuser);


router.post("/chang-status", auth ,admin,changStatus);
router.post("/chang-role", auth ,admin,changRole);

module.exports = router;