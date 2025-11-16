

const shopBtn = document.getElementById('toggleShopForm');
const shopForm = document.getElementById('shopForm');

shopBtn.addEventListener('click', () => {
    shopForm.style.display = shopForm.style.display === 'none' ? 'block' : 'none';
});
// Toggle the Add Product form per shop
const toggleButtons = document.querySelectorAll('.add_product_btn');

toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const form = btn.nextElementSibling; // the form right after the button
        form.style.display = form.style.display === 'none' ? 'block' : 'none';

        // Optional: scroll into view
        if (form.style.display === 'block') {
            form.scrollIntoView({behavior: 'smooth'});
        }
    });
});


