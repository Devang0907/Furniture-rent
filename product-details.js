document.addEventListener('DOMContentLoaded', () => {
    const productDetails = JSON.parse(localStorage.getItem('productDetails'));

    if (productDetails) {
        document.getElementById('product-image').src = productDetails.image;
        document.getElementById('product-image').alt = productDetails.name;
        document.getElementById('product-name').textContent = productDetails.name;
        document.getElementById('product-price').textContent = `$${productDetails.price}/month`;
    }

    document.querySelector('.product-detail button').addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(productDetails);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productDetails.name} has been added to the cart`);
    });
});
