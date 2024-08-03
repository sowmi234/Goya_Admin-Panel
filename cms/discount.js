document.getElementById('discount-code-btn').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('automatic-discount-btn').classList.remove('active');
    document.getElementById('discount-code-section').style.display = 'block';
});

document.getElementById('automatic-discount-btn').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('discount-code-btn').classList.remove('active');
    document.getElementById('discount-code-section').style.display = 'none';
});

document.getElementById('generate-code').addEventListener('click', function() {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    document.getElementById('discount-code').value = randomCode;
});
document.addEventListener('DOMContentLoaded', function () {
    const percentageRadio = document.getElementById('percentage-radio');
    const percentageInputDiv = document.getElementById('percentage-input');
    const radioButtons = document.getElementsByName('discount-value');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            if (percentageRadio.checked) {
                percentageInputDiv.classList.remove('hidden');
            } else {
                percentageInputDiv.classList.add('hidden');
            }
        });
    });
});