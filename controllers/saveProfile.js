const db = require("../routes/db.config");

const saveProfile = async (req, res) => {
    const { u_id, field, value } = req.body;

    // Whitelist allowed fields to prevent SQL injection
    const allowedFields = ['name', 'email', 'password', 'phone', 'u_name', 'l_name', 'country', 'pp']; // Add all valid fields here
    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: "Invalid field" });
    } 

    try {
        // Check if the value already exists for another user
        db.query(`SELECT * FROM users WHERE ${field} = ? AND id != ?`, [value, u_id], async (err, data) => {
            if (err) {
                return res.json({ error: err.message });
            }
            if (data.length > 0) {
                return res.json({ error: `The ${field} is already owned by another user.` });
            }

            // If no other user has the value, proceed to update
            db.query(`UPDATE users SET ${field} = ? WHERE id = ?`, [value, u_id], (err, result) => {
                if (err) {
                    return res.json({ error: err.message });
                }
           
                
                if (result.affectedRows > 0) {
                    return res.json({ success: "Profile updated successfully" });
                } else {
                    return res.json({ error: "Could not update profile" });
                }
            });
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = saveProfile;
