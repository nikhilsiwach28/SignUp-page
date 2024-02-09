const db = require('../database/db')
const bcrypt = require('bcrypt');


function getAllUserNames(req,res){
    db.getAllUserNames((err, usernames) => {
        if (err) {
            console.error('Error fetching usernames from the database:', err);
            return res.status(500).json({ status: 'error', message: 'Internal server error' });
        }

        // Check if usernames are empty or not
        if (!usernames || usernames.length === 0) {
            console.log("No User Found")
            return res.json({ status: 'success', message: 'No usernames found' });
        }
        // Return the usernames as JSON
        res.json({ status: 'success', usernames });
    });
}



function addUser(req, res) {
    const { firstName, lastName, username, email, password } = req.body;
    
     // Hash the password before storing it
     bcrypt.hash(password, 10, function(err, hashedPassword) {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        db.insertUser(firstName, lastName, username, email, hashedPassword, function(err, userId) {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log('User inserted successfully. User ID:', userId);
                res.json({ userId });
            }
        });
    });
}


module.exports = {
    getAllUserNames,
    addUser
}