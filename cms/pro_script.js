// Manage products table
document.addEventListener('DOMContentLoaded', function() {
    const productTableBody = document.getElementById('productTableBody');
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const selectAllCheckbox = document.getElementById('selectAll');
    const actionButtonsRow = document.getElementById('actionButtonsRow');
    const productTableHeader = document.getElementById('productTableHeader');

    if (!productTableBody) {
        console.error('Table body element not found.');
        return;
    }

    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length === 0) {
        productTableBody.innerHTML = '<tr><td colspan="10">No products found.</td></tr>';
    } else {
        products.forEach(product => {
            const media = Array.isArray(product.media) ? product.media : [];

            let statusClass;
            switch (product.status) {
                case 'active':
                    statusClass = 'status active';
                    break;
                case 'draft':
                    statusClass = 'status draft';
                    break;
                case 'archived':
                    statusClass = 'status archived';
                    break;
                default:
                    statusClass = 'status-default';
            }

            let row = document.createElement('tr');
            row.setAttribute('data-status', product.status.toLowerCase());
            row.innerHTML = `
                <td><input type="checkbox" class="product-checkbox"></td>
                <td>${product.title || 'N/A'}</td>
                <td>${product.description || 'N/A'}</td>
                <td>${media.length > 0 ? media.map(m => `<img src="${m}" alt="Product Image" style="width:50px;height:50px;">`).join('') : 'No Media'}</td>
                <td>${product.category || 'N/A'}</td>
                <td class="${statusClass}">${product.status || 'N/A'}</td>
                <td>${product.productType || 'N/A'}</td>
                <td>${product.inventory || 'N/A'}</td>
                <td>${product.collections || 'N/A'}</td>
                <td>${product.template || 'N/A'}</td>
            `;
            productTableBody.appendChild(row);
        });
    }

    if (selectAllCheckbox && actionButtonsRow && productTableHeader) {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                toggleActionButtons();
            });
        });

        selectAllCheckbox.addEventListener('change', function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
                checkbox.dispatchEvent(new Event('change'));
            });
        });
    }

    function toggleActionButtons() {
        const anyChecked = document.querySelectorAll('.product-checkbox:checked').length > 0;
        productTableHeader.classList.toggle('transparent-header', anyChecked);
        actionButtonsRow.style.display = anyChecked ? 'table-row' : 'none';
    }
});

// Archive products
function archiveSelectedProducts() {
    alert('Selected products have been archived.');
}

// Delete products
function deleteSelectedProducts() {
    if (confirm('Are you sure you want to delete the selected products?')) {
        const selectedCheckboxes = document.querySelectorAll('.product-checkbox:checked');
        selectedCheckboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            row.parentNode.removeChild(row);
        });
        toggleActionButtons();
        alert('Selected products have been deleted.');
    }
}

// Update products
function updateSelectedProducts() {
    window.location.href = 'add_product.html';
}

// Filter products by status
function filterProducts(status) {
    const productRows = document.querySelectorAll('#productTable tbody tr');
    productRows.forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        if (status === 'all' || rowStatus === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Search products
function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#productTable tbody tr');
    
    rows.forEach(row => {
        const productName = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
        if (productName.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Handle file upload
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById("file-input");
    const dragArea = document.getElementById("drag-area");

    if (fileInput && dragArea) {
        fileInput.addEventListener("change", handleFiles, false);
        dragArea.addEventListener("dragover", handleDragOver, false);
        dragArea.addEventListener("drop", handleFileSelect, false);
    }

    function handleFiles() {
        const files = this.files;
        displayFiles(files);
    }

    function handleDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    }

    function handleFileSelect(event) {
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer.files;
        displayFiles(files);
    }

    function displayFiles(files) {
        dragArea.innerHTML = '';
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const div = document.createElement("div");
            div.textContent = file.name;
            dragArea.appendChild(div);
        }
    }
});

// Handle product form submission and save to localStorage
document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const mediaFiles = document.getElementById('file-input').files;
            const category = document.getElementById('category').value;
            const status = document.getElementById('status').value;
            const productType = document.getElementById('product-type').value;
            const inventory = document.getElementById('vendor').value;
            const collections = document.getElementById('collections').value;
            const template = document.getElementById('template').value;

            const media = [];
            let filesRead = 0;

            for (let i = 0; i < mediaFiles.length; i++) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    media.push(event.target.result);
                    filesRead++;
                    if (filesRead === mediaFiles.length) {
                        const product = {
                            title,
                            description,
                            media,
                            category,
                            status,
                            productType,
                            inventory,
                            collections,
                            template
                        };

                        let products = JSON.parse(localStorage.getItem('products')) || [];
                        products.push(product);
                        localStorage.setItem('products', JSON.stringify(products));

                        window.location.href = 'manage_products.html';
                    }
                };
                reader.readAsDataURL(mediaFiles[i]);
            }
        });

        // Handle file input click from the upload button
        const uploadBtn = document.querySelector('.upload_btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', function() {
                document.getElementById('file-input').click();
            });
        }

        // Drag-and-drop handling (optional)
        const dragArea = document.getElementById('drag-area');
        if (dragArea) {
            dragArea.addEventListener('dragover', function(event) {
                event.preventDefault();
                dragArea.classList.add('active');
            });

            dragArea.addEventListener('dragleave', function() {
                dragArea.classList.remove('active');
            });

            dragArea.addEventListener('drop', function(event) {
                event.preventDefault();
                dragArea.classList.remove('active');
                const files = event.dataTransfer.files;
                const fileInput = document.getElementById('file-input');
                if (fileInput) {
                    fileInput.files = files;
                }
            });
        }
    }
});


// Toggle the visibility of the search bar
function toggleSearchBar() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        if (searchInput.style.display === 'none') {
            searchInput.style.display = 'inline-block'; // or 'block', depending on your layout
        } else {
            searchInput.style.display = 'none';
        }
    }
}

// Function to search products (ensure this function is defined elsewhere in your script)
function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#productTable tbody tr');
    
    rows.forEach(row => {
        const productName = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
        if (productName.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname.split('/').pop(); // Get current page name
    const menuItems = document.querySelectorAll('.sidebar nav ul li');

    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link.getAttribute('href') === currentPath) {
            item.classList.add('active'); // Add active class to the current page menu item
        } else {
            item.classList.remove('active'); // Remove active class from other items
        }
    });
});
