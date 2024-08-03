document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation regex (at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate email format
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate strong password
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return;
    }

    // Prepare data for API request
    const loginData = {
        email: email,
        password: password,
        rememberMe: rememberMe
    };

    // Simulate a successful login response
    const mockResponse = { success: true };

    // Handle login response
    if (mockResponse.success) {
        // Redirect to the home page
        window.location.href = 'home.html';  // Change this to your actual home page URL
    } else {
        alert('Login failed.');
    }
});
