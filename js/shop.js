/**
 * Haus of Beauty - Shop & Cart Logic
 */

// PRODUCT DATA (Categorized by length)
const products = [
    {
        id: 'sh5',
        name: 'Lemonade Braids',
        category: 'sh',
        price: 40,
        image: 'assets/images/gallery/img-10.jpg',
        description: 'Luxury shoulder length lemonade braids.'
    },
    {
        id: 'br2',
        name: 'Simple Installation',
        category: 'br',
        price: 35,
        image: 'assets/images/gallery/img-4.jpg',
        description: 'Professional breast length installation.'
    },
    {
        id: 'br3',
        name: 'Goddess Braids',
        category: 'br',
        price: 40,
        image: 'assets/images/gallery/img-12.jpg',
        description: 'Exquisite breast length goddess braids.'
    },
    {
        id: 'wai2',
        name: 'Installation with Styling',
        category: 'wai',
        price: 45,
        image: 'assets/images/gallery/img-3.jpg',
        description: 'Waist length installation with premium styling.'
    },
    {
        id: 'wai5',
        name: 'Nicole Unit',
        category: 'wai',
        price: 40,
        image: 'assets/images/gallery/img-19.jpg',
        description: 'Sleek waist length Nicole unit.'
    },
    {
        id: 'but3',
        name: 'Small Knotless Kids',
        category: 'but',
        price: 60,
        image: 'assets/images/gallery/img-23.jpg',
        description: 'Perfectly sized butt length knotless braids for kids.'
    },
    {
        id: 'but7',
        name: 'Knotless Braids',
        category: 'but',
        price: 55,
        image: 'assets/images/gallery/img-27.jpg',
        description: 'Classic butt length knotless braids.'
    }
];

// STATE
let cart = JSON.parse(localStorage.getItem('hausCart')) || [];

// DOM ELEMENTS
const productGrid = document.getElementById('productGrid');
const cartDrawer = document.getElementById('cartDrawer');
const cartPanel = document.getElementById('cartPanel');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCountElement = document.getElementById('cartCount');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartBtn = document.getElementById('cartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const categoryBtns = document.querySelectorAll('.category-btn');

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    updateCartUI();
    setupEventListeners();
});

function setupEventListeners() {
    // Cart Toggle
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);

    // Filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');

            // UI Update
            categoryBtns.forEach(b => b.classList.remove('bg-black', 'text-white'));
            categoryBtns.forEach(b => b.classList.add('border-gray-200'));
            btn.classList.add('bg-black', 'text-white');
            btn.classList.remove('border-gray-200');

            renderProducts(category);
        });
    });

    // Checkout
    checkoutBtn.addEventListener('click', handleCheckout);
}

// ===== SHOP LOGIC =====

function renderProducts(filter = 'all') {
    productGrid.innerHTML = '';

    const filtered = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    if (filtered.length === 0) {
        productGrid.innerHTML = `
            <div class="col-span-full py-20 text-center">
                <p class="text-gray-400 font-serif italic text-xl tracking-widest uppercase">Coming Soon...</p>
            </div>
        `;
        return;
    }

    filtered.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'group product-card opacity-0 translate-y-8';
        card.innerHTML = `
            <div class="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-100 rounded-3xl">
                <img src="${product.image}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="${product.name}">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                    <button onclick="addToCart('${product.id}')" class="w-full bg-white text-black py-4 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition duration-500 hover:bg-black hover:text-white">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="text-center">
                <h3 class="font-serif text-lg tracking-wide mb-1">${product.name}</h3>
                <p class="text-gray-500 font-sans text-sm">$${product.price.toFixed(2)}</p>
            </div>
        `;
        productGrid.appendChild(card);

        // Entrance animation
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out"
        });
    });
}

// ===== CART LOGIC =====

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('hausCart', JSON.stringify(cart));
}

function updateCartUI() {
    // Count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalItems;

    // Items
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="text-center py-20 text-gray-400">Your cart is empty</div>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const el = document.createElement('div');
            el.className = 'flex items-center gap-4 mb-6 pb-6 border-b border-gray-50';
            el.innerHTML = `
                <img src="${item.image}" class="w-20 h-24 object-cover rounded-xl" alt="${item.name}">
                <div class="flex-grow">
                    <h4 class="font-serif text-base mb-1">${item.name}</h4>
                    <p class="text-sm text-gray-400 mb-2">$${item.price.toFixed(2)}</p>
                    <div class="flex items-center gap-3">
                        <button onclick="updateQuantity('${item.id}', -1)" class="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50">-</button>
                        <span class="text-sm font-bold w-4 text-center">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)" class="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50">+</button>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-bold text-sm mb-4">$${itemTotal.toFixed(2)}</p>
                    <button onclick="removeFromCart('${item.id}')" class="text-gray-300 hover:text-black transition">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(el);
        });
        lucide.createIcons();
    }

    cartTotalElement.innerText = `$${total.toFixed(2)}`;
}

function openCart() {
    cartDrawer.classList.remove('hidden');
    requestAnimationFrame(() => {
        cartPanel.classList.remove('translate-x-full');
    });
}

function closeCart() {
    cartPanel.classList.add('translate-x-full');
    setTimeout(() => {
        cartDrawer.classList.add('hidden');
    }, 500);
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    let message = `Hello Haus of Beauty! I'd like to place an order:%0A%0A`;
    cart.forEach(item => {
        message += `• ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}%0A`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `%0A*Total: $${total.toFixed(2)}*%0A%0APlease let me know the availability and payment options!`;

    const whatsappUrl = `https://wa.me/263785260818?text=${message}`;
    window.open(whatsappUrl, '_blank');
}
