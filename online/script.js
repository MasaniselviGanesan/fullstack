let cart = [];

// Load cart from local storage
function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = savedCart;
    updateCartCount();
    updateCart();
}

// Load ads from local storage
function loadAds() {
    const savedAds = JSON.parse(localStorage.getItem('ads')) || [];
    const adList = document.getElementById('adList');

    savedAds.forEach(ad => {
        const adItem = createAdElement(ad.title, ad.description, ad.price, ad.imgSrc);
        adList.appendChild(adItem);
    });
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Save ads to local storage
function saveAds(ad) {
    const savedAds = JSON.parse(localStorage.getItem('ads')) || [];
    savedAds.push(ad);
    localStorage.setItem('ads', JSON.stringify(savedAds));
}

// Create ad element for displaying
function createAdElement(title, description, price, imgSrc) {
    const adItem = document.createElement('div');
    adItem.className = 'ad';

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = title;
    img.classList.add('ad-image');

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() {
        adItem.remove();
        removeAdFromStorage(title);
    };

    const addToCartButton = document.createElement('button');
    addToCartButton.innerText = 'Add to Cart';
    addToCartButton.className = 'add-to-cart-button';
    addToCartButton.onclick = function() {
        addToCart({ title, description, price, imgSrc });
    };

    adItem.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Price: ₹${price}</p>
    `;
    adItem.prepend(img);
    adItem.appendChild(deleteButton);
    adItem.appendChild(addToCartButton);

    return adItem;
}

// Remove ad from storage
function removeAdFromStorage(title) {
    let savedAds = JSON.parse(localStorage.getItem('ads')) || [];
    savedAds = savedAds.filter(ad => ad.title !== title);
    localStorage.setItem('ads', JSON.stringify(savedAds));
}

// Handle form submission for posting an ad
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value.trim();
    const imageFile = document.getElementById('image').files[0];

    // Basic validation
    if (!title || !description || !price || !imageFile) {
        alert("Please fill out all fields and select an image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgSrc = e.target.result;
        const adItem = createAdElement(title, description, price, imgSrc);
        document.getElementById('adList').appendChild(adItem);
        
        // Save ad to local storage
        saveAds({ title, description, price, imgSrc });

        // Hide the modal after submission
        document.getElementById('adForm').style.display = 'none';
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }

    document.getElementById('form').reset();
});

// Add to Cart Functionality
function addToCart(ad) {
    cart.push(ad);
    saveCart();
    alert(`${ad.title} has been added to your cart!`);
    updateCart();
    updateCartCount();
}

// Remove item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
    updateCartCount();
}

// Update the cart display
function updateCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.title}" class="cart-item-image">
            <div>
                <h4>${item.title}</h4>
                <p>Price: ₹${item.price}</p>
                <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartList.appendChild(cartItem);
    });
}

// Update cart item count
function updateCartCount() {
    document.getElementById('cartCount').innerText = `(${cart.length} item${cart.length !== 1 ? 's' : ''})`;
}

// Handle Checkout
document.getElementById('checkoutButton').addEventListener('click', function() {
    console.log("Checkout button clicked");
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Show the address form modal
    document.getElementById('addressForm').style.display = 'block';
});

// Handle address form submission
document.getElementById('addressDetailsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const street = document.getElementById('street').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();

    // Validate address fields
    if (!street || !city || !state || !zip) {
        alert("Please fill out all address fields.");
        return;
    }

    // Gather order details
    let orderDetails = "Your Order:\n";
    cart.forEach(item => {
        orderDetails += `${item.title} - ₹${item.price}\n`;
    });
    orderDetails += "Total: ₹" + cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

    // Prompt for payment details
    const paymentDetails = prompt("Please enter your payment details (e.g., UPI number):");
    if (paymentDetails) {
        alert("Order placed successfully!\n" + orderDetails + `\nAddress: ${street}, ${city}, ${state} ${zip}\nPayment details: ${paymentDetails}`);
        
        // Clear the cart and posted ads
        cart = []; // Clear the cart
        document.getElementById('cartList').innerHTML = ''; // Clear cart display
        updateCartCount(); // Update cart count display

        // Clear posted ads from display and local storage
        localStorage.removeItem('ads'); // Clear ads from local storage
        document.getElementById('adList').innerHTML = ''; // Clear displayed ads

        // Hide the address form modal
        document.getElementById('addressForm').style.display = 'none';
    } else {
        alert("Payment details are required to complete the order.");
    }
}); 

// Load saved cart and ads on page load
window.onload = function() {
    loadCart();
    loadAds();
};
