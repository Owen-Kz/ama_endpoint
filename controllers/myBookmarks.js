const db = require("../routes/db.config");
const axios = require('axios');

const myBookmarks = async (req, res) => {
    const { page, user_id } = req.body;
    let items_per_page = 20;
    const OFFSET = (page - 1) * items_per_page;
    let totalPages = 0;

    db.query("SELECT * FROM favorites WHERE user_id = ?", [user_id], async (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ error: err });
        }

        if (data.length > 0) {
            totalPages = Math.ceil(data.length / items_per_page);
            let listings = [];

            for (let i = 0; i < data.length; i++) {
                const listingId = data[i].listing_id;

                const result = await new Promise((resolve, reject) => {
                    db.query(
                        "SELECT * FROM listings WHERE status = 'approved' AND id = ? ORDER BY id DESC LIMIT ? OFFSET ?",
                        [listingId, items_per_page, OFFSET],
                        (err, result) => {
                            if (err) return reject(err);
                            resolve(result);
                        }
                    );
                });

                if (result.length > 0) {
                    listings.push(...result);
                }
            }

            return res.json({
                success: "listings",
                listings: listings,
                pageCount: page,
                totalCount: totalPages
            });
        } else {
            return res.json({
                success: "listings",
                listings: [],
                pageCount: page,
                totalCount: totalPages
            });
        }
    });
};

module.exports = myBookmarks;
