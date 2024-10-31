const db = require("../../routes/db.config");

function generateCode(user) {
    return new Promise((resolve, reject) => {
        let part1 = Math.floor(1000 + Math.random() * 9000);  // Generates a 4-digit number
        let part2 = Math.floor(1000 + Math.random() * 9000);  // Generates another 4-digit number
        const uniqueCode = `ref-${part1}-${part2}`;

        // Check if user has a unique code
        db.query("SELECT referral_code FROM users WHERE email = ? OR u_name = ?", [user, user], (err, data) => {
            if (err) {
                console.log(err);
                reject(err);  // Reject the Promise if there's an error
            } else {
                if (data[0] && data[0].referral_code != null) {
                    resolve(true);  // User already has a unique code
                } else {
                    // Update with a new unique code if none exists
                    db.query("UPDATE users SET referral_code = ? WHERE u_name = ? OR email = ?", [uniqueCode, user, user], (err, result) => {
                        if (err) {
                            reject(err);  // Reject the Promise if there's an error during update
                        } else {
                            // console.log(result);
                            resolve(uniqueCode);  // Resolve with the newly generated unique code
                        }
                    });
                }
            }
        });
    });
}

module.exports = generateCode;
