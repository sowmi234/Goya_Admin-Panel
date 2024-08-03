document.addEventListener('DOMContentLoaded', function() {
    const productTableBody = document.getElementById('productTableBody');
    const selectAllCheckbox = document.getElementById('selectAll');
    const actionButtonsRow = document.getElementById('actionButtonsRow');
    const productTableHeader = document.getElementById('productTableHeader');

    // Load products from localStorage and display them in the table
    let products = JSON.parse(localStorage.getItem('products')) || [];

    function displayProducts() {
        productTableBody.innerHTML = ''; // Clear the table body
        if (products.length === 0) {
            productTableBody.innerHTML = '<tr><td colspan="10">No products found.</td></tr>';
        } else {
            products.forEach((product, index) => {
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
                    <td><input type="checkbox" class="product-checkbox" data-index="${index}"></td>
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
        addCheckboxListeners();
    }

    function addCheckboxListeners() {
        const checkboxes = document.querySelectorAll('.product-checkbox');
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
    }

    function toggleActionButtons() {
        const anyChecked = document.querySelectorAll('.product-checkbox:checked').length > 0;
        productTableHeader.classList.toggle('transparent-header', anyChecked);
        actionButtonsRow.style.display = anyChecked ? 'table-row' : 'none';
    }

    // Initial display of products
    displayProducts();
});

// Delete selected products
function deleteSelectedProducts() {
    if (confirm('Are you sure you want to delete the selected products?')) {
        const selectedCheckboxes = document.querySelectorAll('.product-checkbox:checked');
        const indexesToDelete = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.getAttribute('data-index')));
        indexesToDelete.sort((a, b) => b - a); // Sort in descending order to delete from the end

        indexesToDelete.forEach(index => {
            products.splice(index, 1);
        });

        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        alert('Selected products have been deleted.');
    }
}

// Add this function to refresh the products displayed in the table after deletion
function displayProducts() {
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = ''; // Clear the table body
    if (products.length === 0) {
        productTableBody.innerHTML = '<tr><td colspan="10">No products found.</td></tr>';
    } else {
        products.forEach((product, index) => {
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
                <td><input type="checkbox" class="product-checkbox" data-index="${index}"></td>
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
    addCheckboxListeners();
}

// Add event listener to Delete button
document.querySelector('button[onclick="deleteSelectedProducts()"]').addEventListener('click', deleteSelectedProducts);

// Ensure products array is globally accessible
let products = JSON.parse(localStorage.getItem('products')) || [];


// Toggle the filter popup visibility
function toggleFilterPopup() {
    const filterPopup = document.getElementById('filterPopup');
    if (filterPopup) {
        filterPopup.classList.toggle('show'); // Add or remove the 'show' class to control visibility
    }
}

// Apply the selected filter and close the popup
function applyFilter(filterType) {
    // Close the popup
    const filterPopup = document.getElementById('filterPopup');
    if (filterPopup) {
        filterPopup.classList.remove('show'); // Remove 'show' class to hide the popup
    }

    // Get the products and sort based on the filterType
    const productTableBody = document.getElementById('productTableBody');
    if (productTableBody) {
        let rows = Array.from(productTableBody.getElementsByTagName('tr'));
        rows.sort((a, b) => {
            const aText = a.getElementsByTagName('td')[1].innerText; // Sorting based on the Title column
            const bText = b.getElementsByTagName('td')[1].innerText;
            if (filterType === 'oldest-newest') {
                return aText.localeCompare(bText);
            } else if (filterType === 'newest-oldest') {
                return bText.localeCompare(aText);
            } else if (filterType === 'a-to-z') {
                return aText.localeCompare(bText);
            } else if (filterType === 'z-to-a') {
                return bText.localeCompare(aText);
            }
        });

        // Append sorted rows back to the table
        rows.forEach(row => productTableBody.appendChild(row));
    }
}

// Close the filter popup if clicking outside of it
window.onclick = function(event) {
    const filterPopup = document.getElementById('filterPopup');
    const filterBtn = document.querySelector('.filter-btn');
    if (event.target !== filterPopup && !filterPopup.contains(event.target) && event.target !== filterBtn && !filterBtn.contains(event.target)) {
        if (filterPopup) {
            filterPopup.classList.remove('show');
        }
    }
}


function togglePopup() {
    const popup = document.getElementById("userPopup");
    popup.style.display = popup.style.display === "block" ? "none" : "block";
}

function manageAccount() {
    alert("Manage Account Clicked");
}

function logout() {
    alert("Logout Clicked");
}

function addDenomination() {
    const container = document.getElementById('denominations-container');
    const denominationRow = document.createElement('div');
    denominationRow.className = 'denomination-row';
    denominationRow.innerHTML = `
        <input type="number" name="denominations[]" placeholder="New Denomination">
        <button type="button" class="remove-denomination" onclick="removeDenomination(this)">Remove</button>
    `;
    container.appendChild(denominationRow);
}

function removeDenomination(button) {
    const denominationRow = button.parentElement;
    denominationRow.remove();
}
