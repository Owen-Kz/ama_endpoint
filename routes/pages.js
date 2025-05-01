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
const sendEmail = require("../controllers/sendEmail");
const sentEmails = require("../controllers/sentEmails");
const fullPageAd = require("../controllers/fullPage");
const subscrbe = require("../controllers/subscribe");
const subscribers = require("../controllers/admin/subscribers");
const BrandAds = require("../controllers/admin/brandAds");
const BrandActions = require("../controllers/admin/brandActions");
const getBrandInfo = require("../controllers/admin/getBrandInfo");
const sponsoredAds = require("../controllers/sponsoredAds");
const verifyToken = require("../controllers/verifyAccount");
const makePayment = require("../controllers/handlePayments");
const stripeClientKey = require("../controllers/admin/stripeClientKey");
const StripeWEbHooks = require("../controllers/admin/stripeWebHookes");
const bodyParser = require("body-parser");
const forgotPassword = require("../controllers/utils/forgotPassword");
const verifyCode = require("../controllers/utils/verifyToken");
const createPassword = require("../controllers/utils/createPassword");
const staticAd = require("../controllers/staticAdvert");
const PostBrandAdvert = require("../controllers/postBrandAdvert");
const getSlideShowAdvert = require("../controllers/getSlideShowAdvert");
const PostFullPageADvert = require("../controllers/postFulPageAd");
const FullPageActions = require("../controllers/admin/fullPageActions");
const updateItem = require("../controllers/updateAdvert");
const getReferrals = require("../controllers/referrrals/getReferrals");
const SaveAnalytics = require("../controllers/analytics/saveAbalytics");
const getAnalytics = require("../controllers/analytics/getAnalytics");
const CheckFreeAdverts = require("../controllers/advertManagements/checkFreeAdverts");
const CreateFreeAdvertEntry = require("../controllers/advertManagements/createFreeAdvertEntry");
const createPaidAdvertEntry = require("../controllers/advertManagements/createPaidAdvert");
const setToExpired = require("../controllers/advertManagements/setToExpired");
const saveWalletTransaction = require("../controllers/wallet/SaveWaletTransaction");
const updateExchangeRate = require("../controllers/countries/updateExchangeRates");
const chargeWalletBalance = require("../controllers/wallet/chargeWallet");
const router = express.Router();
router.use(express.json());
router.use(bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();  // Store the raw body as a string
    }
  }));

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
router.post("/y/postBrandAd", PostBrandAdvert )
router.post("/y/postFullpageAd", PostFullPageADvert)
router.post("/y/updateAdvert", updateItem)
router.post("/y/fullpageAd", fullPageAd)
router.post("/y/subscribe/", subscrbe)
router.post("/y/sponsoredAdverts", sponsoredAds)
router.post("/y/staticAdverts", staticAd)
router.get("/y/slideshowAdverts", getSlideShowAdvert)


// For Admin 
router.post("/y/admin/login", login_admin)
router.post("/y/admin/loggedIn", AdminLoggedIn)
router.post("/y/countAdminListings", countAdminListings)
router.post("/y/admin/createAnnouncement", createAnnoucements)
router.post("/y/action/item/:uid", adminActions)
router.post("/y/itemsInCategory", ItemsInCat)
router.post("/y/allUsers", allUsers)
router.post("/y/admin/subsribers", subscribers)
router.post("/y/AllBrandAds/", BrandAds)
router.post("/y/admin/sendMail", sendEmail)
router.post("/y/admin/sentMail", sentEmails)
router.post("/y/action/brand/:uid", BrandActions)
router.post("/y/action/fullpage/:uid", FullPageActions)
router.post("/y/BrandInfo/:id", getBrandInfo)
router.post("/y/verifyAccount", verifyToken)
router.post("/y/makePayments", makePayment)
router.post("/y/getClientKey", stripeClientKey)
router.post("/y/forgot-password", forgotPassword)
router.post("/y/verifyCode", verifyCode)
router.post("/y/create-password", createPassword)
router.post("/y/getReferrals", getReferrals)
router.post("/y/create-analytics", SaveAnalytics)
router.post("/y/getAnalytics", getAnalytics)
// Add middleware to capture raw body

// Check free averts 
router.post("/y/checkFreeAds", CheckFreeAdverts)
router.post("/y/createFreeAdvert", CreateFreeAdvertEntry)
router.post("/y/createPaidAdvertEntry", createPaidAdvertEntry)
router.post("/y/setToExpired", setToExpired)
router.post("/y/updateExchangeRate", updateExchangeRate)


router.post("/y/stripe/webhooks", StripeWEbHooks) 
router.post("/y/saveWalletTransaction", saveWalletTransaction)
router.post("/y/ChargeWallet", chargeWalletBalance)
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