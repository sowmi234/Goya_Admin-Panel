// Add this JavaScript code in a script tag at the end of your add_product.html file or in pro_script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        const product = {
            title: formData.get('title'),
            description: formData.get('description'),
            media: formData.get('media'), // Media handling needs more code for actual file storage
            category: formData.get('category'),
            status: formData.get('status'),
            productType: formData.get('product_type'),
            vendor: formData.get('vendor'),
            collections: formData.get('collections'),
            template: formData.get('template')
        };

        // Get existing products from local storage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        // Optionally redirect to manage_products.html
        window.location.href = 'manage_products.html';
    });
});
