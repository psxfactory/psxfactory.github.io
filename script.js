// You can add any JavaScript functionality here if needed.
// For example, you could add a smooth scroll to the "Explore Assets" button:

document.addEventListener('DOMContentLoaded', function() {
    const exploreButton = document.querySelector('.cta-button');

    exploreButton.addEventListener('click', function(event) {
        event.preventDefault();
        const productsSection = document.getElementById('products');
        productsSection.scrollIntoView({ behavior: 'smooth' });
    });
});
