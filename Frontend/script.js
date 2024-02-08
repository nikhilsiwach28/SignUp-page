async function fetchExistingUserIds() {
    try {
        const response = await fetch('http://127.0.0.1:3000/allUserIds'); // assuming we know port already   
        if (!response.ok) {
            throw new Error('Error fetching existing user IDs.');
        }
        const responseData = await response.json();
        if (responseData.status === 'success') {
            const usernames = responseData.usernames.map(user => user.username);
            return usernames;
        } else {
            throw new Error('Failed to fetch existing user IDs.');
        }
    } catch (error) {
        console.error(error.message);
        return [];
    }
}


async function submitSignUpForm(event) {
    event.preventDefault();
    const existingUserIds = await fetchExistingUserIds();
    console.log("Existing users:", existingUserIds);

    // Basic form validation
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Password and Confirm Password validation 
    if (password !== confirmPassword) {
        alert("Password and Confirm Password must match."); // We can also add more checks for pasword length and constraints.
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        // alert("Invalid email address.");
        displayMessage('error', "Invalid email address.");
        return;
    }

    if (existingUserIds.includes(username)) {  // same check we can also do for emailId
        // alert("Username already exists. Please choose a different one.");
        displayMessage('error', "Username already exists. Please choose a different one.");
        return;
    }
    
    const userData = {
        firstName,
        lastName,
        username,
        email,
        password,
    };

    try {
        const response = await fetch('http://127.0.0.1:3000/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to add user.');
        }
        const responseData = await response.json();
        console.log('User added successfully. User ID:', responseData.userId); // Got the UserID in response
        // alert('User added successfully!');  // We can redirect from here to User Home page by also login them 
        displayMessage('success', 'User added successfully!');
        return responseData;

    } catch (error) {
        console.error(error.message);
        displayMessage('error', 'Error: Please try again in sometime.');
        // alert('Error:Please trying again in sometime')
        return;
    }
}

function displayMessage(type, message) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = `<div class="${type}-message">${message}</div>`;
}
