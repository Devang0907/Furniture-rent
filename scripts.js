document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.product-card button:not(.view-details), .product-detail button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = button.closest('.product-card, .product-detail');
            const productName = productCard.querySelector('h3, h2').textContent;
            const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', '').replace('/month', ''));
            const productImage = productCard.querySelector('img').src;

            cart.push({ name: productName, price: productPrice, image: productImage });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} has been added to the cart`);
            updateCartPage();
        });
    });

    // View details functionality
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.getAttribute('data-name');
            const productPrice = productCard.getAttribute('data-price');
            const productImage = productCard.getAttribute('data-image');

            const productDetails = {
                name: productName,
                price: productPrice,
                image: productImage,
            };

            localStorage.setItem('productDetails', JSON.stringify(productDetails));
            window.location.href = 'product-details.html';
        });
    });

    const updateCartPage = () => {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                total += item.price;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>$${item.price}/month</p>
                    <button>Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);

                cartItem.querySelector('button').addEventListener('click', () => {
                    const index = cart.indexOf(item);
                    if (index > -1) {
                        cart.splice(index, 1);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartPage();
                    }
                });
            });
            document.getElementById('cart-total').textContent = total.toFixed(2);
        }
    };

    if (document.getElementById('checkout-button')) {
        document.getElementById('checkout-button').addEventListener('click', () => {
            alert('Proceeding to checkout...');
        });
    }

    updateCartPage();
});
