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
const soldOut = require("../controllers/soldOut");
const DeleteItem = require("../controllers/deleteItem");
const bookMarkItem = require("../controllers/bookMarkItem");
const viewsCount = require("../controllers/viewsCount");
const viewItem = require("../controllers/viewItem");
const announcements = require("../controllers/annoucements");
const SellerListings = require("../controllers/sellerListings");
const saveProfile = require("../controllers/saveProfile");
const forums = require("../controllers/forums");
const comments = require("../controllers/forumComments");
const CreateComment = require("../controllers/createComment");
const createForum = require("../controllers/createForum");
const login_admin = require("../controllers/admin/login");
const AdminLoggedIn = require("../controllers/admin/loggedIn");
const countAdminListings = require("../controllers/admin/countAdminListings");
const createAnnoucements = require("../controllers/admin/createAnnouncements");
const AllListgins = require("../controllers/admin/allListings");
const Pending = require("../controllers/admin/pending");
const adminActions = require("../controllers/admin/actions");
const ItemsInCat = require("../controllers/itemsInCategory");
const allUsers = require("../controllers/admin/allUsers");
const AllSubCategories = require("../controllers/getSubCategories");
const PostAd = require("../controllers/postAd");
const getTransactions = require("../controllers/admin/getTransactions");
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
router.post("/y/allSubCategories", AllSubCategories)
router.post("/y/myBookmarks", myBookmarks)
router.post("/y/countMyListings", countMyListings)
router.post("/y/getProductFiles", getProductFiles)
router.post("/y/chatList", ChatList)
router.post("/y/sendMessage", sendMessage)
router.post("/y/chatHistory", ChatHistory)
router.post("/y/soldOut", soldOut)
router.post("/y/DeleteItem", DeleteItem)
router.post("/y/bookMarkItem", bookMarkItem)
router.post("/y/viewsCount", viewsCount)
router.post("/y/viewItem", viewItem)
router.post("/y/announcements", announcements)
router.post("/y/forums", forums)
router.post("/y/comments", comments)
router.post("/y/CreateComment", CreateComment)
router.post("/y/CreateForum", createForum)
router.post("/y/admin/getTransactions", getTransactions)

router.post("/y/sellerListings/:id", SellerListings)
router.post("/y/saveProfile", saveProfile)
router.post("/y/allListings/:uid", AllListgins) 
router.post("/y/pendingListings/:uid", Pending)
router.post("/y/postAd", PostAd)

// For Admin 
router.post("/y/admin/login", login_admin)
router.post("/y/admin/loggedIn", AdminLoggedIn)
router.post("/y/countAdminListings", countAdminListings)
router.post("/y/admin/createAnnouncement", createAnnoucements)
router.post("/y/action/item/:uid", adminActions)
router.post("/y/itemsInCategory", ItemsInCat)
router.post("/y/allUsers", allUsers)

router.post("*", (req,res)=>{
    return res.json({error:"Broken Pipe / Invalid Endpoint"})
})
router.get("*", (req,res)=>{
    res.redirect("/y/d")
})
router.get("/*/", (req, res)=> {
    res.redirect('/y/d')
})
module.exports = router