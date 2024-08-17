const db = require("../routes/db.config");

const sellerInfo = async (req,res) =>{
   const {id} = req.body
   console.log(id)
   
  try {
    // Decrypt the cookie and retrieve user data with the id
    db.query("SELECT u_name, email, created_at, updated_at, name, phone, country, email_verified_at, fb, twitter, flickr, insta, ytube, vimeo, behance, linkd, web, l_name, pp FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({error:"Could Not Get data"}) // Redirect to home on error
      }
      if(result[0]){
        return res.json({success:"IsSeller", user:result[0]});

      }else{
      return res.json({success:"IsSeller", user:[]});

      }

    //   next();
    });
  } catch (error) {
    console.log(error);
    return res.json({error:"Internal Server Error"})
  }
}

module.exports  = sellerInfo