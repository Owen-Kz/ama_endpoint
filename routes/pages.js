const express = require("express");
const login_user = require("../controllers/login");
const register = require("../controllers/register");
const Listings = require("../controllers/allListings");
const getProductInfo = require("../controllers/productInfo");
const LoggedIn = require("../controllers/loggedIn");
const UserListings = require("../controllers/userListings");
const sellerInfo = require("../controllers/sellerInfo");
const AllCategories = require("../controllers/AllCategoris");
const myBookmarks = require("../controllers/myBookmarks");
const countMyListings = require("../controllers/countMyListings");
const getProductFiles = require("../controllers/getProductFiles");
const ChatList = require("../controllers/chatList");
const sendMessage = require("../controllers/sendMessage");
const ChatHistory = require("../controllers/messageHistory");
const router = express.Router();
router.use(express.json());

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });


router.get("/y/d", (req,res) =>{
    res.json({"message":"Broken Link"})
})

router.post("/*/login", login_user)
router.post("/y/register", register)
router.post("/y/allListings", Listings)
router.post("/y/productInfo/:id", getProductInfo)
router.post("/y/loggedIn", LoggedIn)
router.post("/y/userListings/:uid", UserListings)
router.post("/y/sellerInfo/", sellerInfo)
router.post("/y/allCategories", AllCategories)
router.post("/y/myBookmarks", myBookmarks)
router.post("/y/countMyListings", countMyListings)
router.post("/y/getProductFiles", getProductFiles)
router.post("/y/chatList", ChatList)
router.post("/y/sendMessage", sendMessage)
router.post("/y/chatHistory", ChatHistory)
router.get("/*/", (req, res)=> {
    res.redirect('/y/d')
})
module.exports = router