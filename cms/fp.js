document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('reset-form');

    resetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        if (validateEmail(email)) {
            alert('Password reset link has been sent to your email address.');
        } else {
            alert('Please enter a valid email address.');
        }
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
