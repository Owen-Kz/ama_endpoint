
const jwt = require("jsonwebtoken");
const db = require("../routes/db.config");
const dbPromise = require("../routes/dbPromise.config");
const LoggedIn = (req, res, next) => {
    const {token} = req.body
  if (!token) {
    // Redirect to home if user is not logged in
    return res.json({error:"UserNotLoggedIn"})
  }

  try {
    // Decrypt the cookie and retrieve user data with the id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    db.query("SELECT * FROM users WHERE id = ? ", [decoded.id], async (err, result) => {
      if (err) {
        console.log(err);
        return res.json({error:"Could Not Get data"}) // Redirect to home on error
      }
      let CurrencyRate = ""
      const getCurrentExchangeRate = await dbPromise.query("SELECT * FROM exchange_rates WHERE country = ? AND currency = ?",[result[0].country, result[0].currency])

      if(getCurrentExchangeRate[0].length > 0){
        CurrencyRate = getCurrentExchangeRate[0][0]
      }else{
        CurrencyRate = {
          currency: "USD",
          current_rate: "1",
          country: "USA"
        }
      }


      return res.json({success:"IsLoggedIn", user:result[0], CurrencyRate});
    //   next();
    });
  } catch (error) {
    console.log(error);
    return res.json({error:"Internal Server Error"})
  }
};

module.exports = LoggedIn;
