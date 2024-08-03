// inventory.js

function togglePopup() {
    // Function to show admin detailed view popup
    alert("Admin detailed view popup");
}

function toggleSearch() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput.style.display === "none" || searchInput.style.display === "") {
        searchInput.style.display = "inline-block";
    } else {
        searchInput.style.display = "none";
    }
}

function toggleFilter() {
    const filterSelect = document.getElementById("filterSelect");
    if (filterSelect.style.display === "none" || filterSelect.style.display === "") {
        filterSelect.style.display = "inline-block";
    } else {
        filterSelect.style.display = "none";
    }
}

function showSortOptions() {
    const sortOptions = document.getElementById("sortOptions");
    if (sortOptions.style.display === "none" || sortOptions.style.display === "") {
        sortOptions.style.display = "block";
    } else {
        sortOptions.style.display = "none";
    }
}

function sortTable(column, order) {
    const table = document.getElementById("inventoryTable");
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[column].textContent.trim();
        const cellB = rowB.cells[column].textContent.trim();

        if (order === 'asc') {
            return cellA > cellB ? 1 : -1;
        } else {
            return cellA < cellB ? 1 : -1;
        }
    });

    rows.forEach(row => tbody.appendChild(row));
}

document.getElementById("searchInput").addEventListener("input", function() {
    const filter = this.value.toLowerCase();
    const rows = document.getElementById("inventoryTable").getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        let match = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().includes(filter)) {
                match = true;
                break;
            }
        }
        if (match) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
});

document.getElementById("filterSelect").addEventListener("change", function() {
    const filter = this.value;
    const rows = document.getElementById("inventoryTable").getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        const skuCell = rows[i].getElementsByTagName("td")[2];
        if (filter === "" || (filter === "withSKU" && skuCell.innerText !== "No SKU") || (filter === "withoutSKU" && skuCell.innerText === "No SKU")) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
});
