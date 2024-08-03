document.getElementById('reset-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match.');
        return;
    }

    // Example: Perform your password reset logic here
    // You can send the old and new passwords to your server using an AJAX request
    
    alert('Password has been reset successfully.');
});
