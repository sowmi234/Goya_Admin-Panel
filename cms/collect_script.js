document.addEventListener('DOMContentLoaded', function() {
    let tabElements = document.querySelectorAll('.cat-tab');
    tabElements.forEach(tab => {
        tab.addEventListener('click', function() {
            let categoryId = this.getAttribute('data-category-id');
            if (categoryId === 'all') {
                showAllProducts();
            } else if (categoryId === 'others') {
                toggleCategoriesPopup(); // Show or hide the popup
            }
            setActiveTab(this);
        });
    });

    let categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            let categoryId = this.getAttribute('data-category-id');
            filterProductsByCategory(categoryId);
            toggleCategoriesPopup(); // Hide the popup after selection
        });
    });

    // Close popup if click outside
    window.addEventListener('click', function(event) {
        let popup = document.getElementById('popupCategories');
        if (event.target === popup) {
            toggleCategoriesPopup();
        }
    });
});

function filterProductsByCategory(categoryId) {
    let productElements = document.querySelectorAll('.product');
    productElements.forEach(product => {
        if (categoryId === 'all' || product.getAttribute('data-category-id') === categoryId) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

function showAllProducts() {
    filterProductsByCategory('all');
}

function toggleCategoriesPopup() {
    let popup = document.getElementById('popupCategories');
    popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
}

function setActiveTab(selectedTab) {
    let tabs = document.querySelectorAll('.cat-tab');
    tabs.forEach(tab => {
        tab.classList.remove('cat-tab-active');
    });
    selectedTab.classList.add('cat-tab-active');
}
