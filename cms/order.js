document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.orders_table tbody tr');
    rows.forEach(row => {
        row.addEventListener('click', function() {
            const href = this.getAttribute('data-href');
            if (href) {
                window.location.href = href;
            }
        });
    });
});
