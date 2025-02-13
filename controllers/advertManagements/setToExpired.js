const db = require("../../routes/db.config");

const setToExpired = async (req, res) => {
    try {
        // First, fetch the data from the free_adverts table
        db.query("SELECT * FROM free_adverts WHERE 1", async (err, data) => {
            if (err) {
                return res.json({ error: err });
            } else if (data && data.length > 0) {
                // Array to store the promises for each update
                const updatePromises = data.map((item) => {
                    return new Promise((resolve, reject) => {
                        // Check if the listing is older than 3 months
                        const query = `
                            UPDATE listings
                            SET status = 'sold/expired'
                            WHERE id = ?
                            AND created_at < NOW() - INTERVAL 1 MONTH
                            AND status = 'approved';`;

                        db.query(query, [item.item_id], (err, result) => {
                            if (err) {
                                reject(err);  // Reject the promise on error
                            } else {
                                resolve(result);  // Resolve the promise on success
                            }
                        });
                    });
                });

                // Wait for all the update operations to complete
                try {
                    await Promise.all(updatePromises);
                    return res.json({ success: "Listings set to expired successfully" });
                } catch (error) {
                    return res.json({ error: error.message });
                }
            } else {
                return res.json({ error: "No items found in free_adverts table" });
            }
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
};

module.exports = setToExpired;
