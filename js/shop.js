/**
 * Haus of Beauty - Shop & Cart Logic
 */

// PRODUCT DATA (Categorized by length)
const products = [
    // SHOULDER (sh)
    {
        id: 'sh5',
        name: 'Textured Shoulder Locs',
        category: 'sh',
        price: 40,
        image: 'assets/images/gallery/img-10.jpg',
        description: 'Natural look textured locs.'
    },
    {
        id: 'sh6',
        name: 'Classic Shoulder Box',
        category: 'sh',
        price: 30,
        image: 'assets/images/gallery/img-11.jpg',
        description: 'Timeless box braids.'
    },
    // BREAST (br)
    {
        id: 'br1',
        name: 'Medium Knotless (Br)',
        category: 'br',
        price: 30,
        image: 'assets/images/gallery/img-1.jpg',
        description: 'Breast length medium knotless braids.'
    },
    {
        id: 'br2',
        name: 'Lemonade Braids (Br)',
        category: 'br',
        price: 35,
        image: 'assets/images/gallery/img-4.jpg',
        description: 'Breast length side-swept lemonade braids.'
    },
    {
        id: 'br3',
        name: 'Goddess Braids (Br)',
        category: 'br',
        price: 40,
        image: 'assets/images/gallery/img-12.jpg',
        description: 'Breast length curls and braids mix.'
    },
    {
        id: 'br4',
        name: 'Fulani Hybrid (Br)',
        category: 'br',
        price: 40,
        image: 'assets/images/gallery/img-13.jpg',
        description: 'Modern Fulani style.'
    },
    {
        id: 'br5',
        name: 'Twisted Updo (Br)',
        category: 'br',
        price: 35,
        image: 'assets/images/gallery/img-14.jpg',
        description: 'Elegant twisted style.'
    },
    {
        id: 'br6',
        name: 'Signature Braids (Br)',
        category: 'br',
        price: 45,
        image: 'assets/images/gallery/img-15.jpg',
        description: 'Our signature braiding pattern.'
    },
    {
        id: 'br7',
        name: 'Boho Bob (Br)',
        category: 'br',
        price: 40,
        image: 'assets/images/gallery/img-16.jpg',
        description: 'Bohemian style bob.'
    },
    // WAIST (wai)
    {
        id: 'wai1',
        name: 'Extra Small Knotless (Wai)',
        category: 'wai',
        price: 50,
        image: 'assets/images/gallery/img-2.jpg',
        description: 'Waist length extra small knotless braids.'
    },
    {
        id: 'wai2',
        name: 'Boho Braids (Wai)',
        category: 'wai',
        price: 45,
        image: 'assets/images/gallery/img-3.jpg',
        description: 'Waist length bohemian goddess braids.'
    },
    {
        id: 'wai3',
        name: 'Luxury Cornrows (Wai)',
        category: 'wai',
        price: 45,
        image: 'assets/images/gallery/img-17.jpg',
        description: 'Intricate cornrow designs.'
    },
    {
        id: 'wai4',
        name: 'Tribal Braids (Wai)',
        category: 'wai',
        price: 50,
        image: 'assets/images/gallery/img-18.jpg',
        description: 'Tribal integrated patterns.'
    },
    {
        id: 'wai5',
        name: 'Sleek Pony Braids',
        category: 'wai',
        price: 40,
        image: 'assets/images/gallery/img-19.jpg',
        description: 'Sleek ponytail style.'
    },
    {
        id: 'wai6',
        name: 'Jumbo Box Braids (Wai)',
        category: 'wai',
        price: 45,
        image: 'assets/images/gallery/img-20.jpg',
        description: 'Statement jumbo braids.'
    },
    {
        id: 'wai7',
        name: 'Micro Braids (Wai)',
        category: 'wai',
        price: 60,
        image: 'assets/images/gallery/img-21.jpg',
        description: 'Fine micro braids.'
    },
    {
        id: 'wai8',
        name: 'Ombre Braids (Wai)',
        category: 'wai',
        price: 50,
        image: 'assets/images/gallery/img-22.jpg',
        description: 'Color blend braids.'
    },
    // BUTT (but)
    {
        id: 'but1',
        name: 'Small Box Braids (But)',
        category: 'but',
        price: 50,
        image: 'assets/images/gallery/img-1.jpg',
        description: 'Butt length classic small box braids.'
    },
    {
        id: 'but2',
        name: 'Medium Knotless (But)',
        category: 'but',
        price: 45,
        image: 'assets/images/gallery/img-2.jpg',
        description: 'Butt length medium knotless braids.'
    },
    {
        id: 'but3',
        name: 'Goddess Locs (But)',
        category: 'but',
        price: 60,
        image: 'assets/images/gallery/img-23.jpg',
        description: 'Long goddess locs.'
    },
    {
        id: 'but4',
        name: 'Mermaid Braids (But)',
        category: 'but',
        price: 55,
        image: 'assets/images/gallery/img-24.jpg',
        description: 'Flowing mermaid style.'
    },
    {
        id: 'but5',
        name: 'Straight Backs (But)',
        category: 'but',
        price: 40,
        image: 'assets/images/gallery/img-25.jpg',
        description: 'Classic straight backs.'
    },
    {
        id: 'but6',
        name: 'Design Cornrows (But)',
        category: 'but',
        price: 50,
        image: 'assets/images/gallery/img-26.jpg',
        description: 'Artistic pattern cornrows.'
    },
    {
        id: 'but7',
        name: 'Kinky Twists (But)',
        category: 'but',
        price: 55,
        image: 'assets/images/gallery/img-27.jpg',
        description: 'Natural texture twists.'
    },
    {
        id: 'but8',
        name: 'Butterfly Locs (But)',
        category: 'but',
        price: 60,
        image: 'assets/images/gallery/img-28.jpg',
        description: 'Distressed butterfly locs.'
    },
    // KNEE (knee)
    {
        id: 'knee1',
        name: 'Small Knotless (Knee)',
        category: 'knee',
        price: 65,
        image: 'assets/images/gallery/img-3.jpg',
        description: 'Knee length small knotless braids.'
    },
    {
        id: 'knee2',
        name: 'Fulani Braids (Knee)',
        category: 'knee',
        price: 65,
        image: 'assets/images/gallery/img-7.jpg',
        description: 'Knee length traditional Fulani braids.'
    },
    {
        id: 'knee3',
        name: 'Rapuncel Braids (Knee)',
        category: 'knee',
        price: 70,
        image: 'assets/images/gallery/img-29.jpg',
        description: 'Extra long flowing braids.'
    },
    {
        id: 'knee4',
        name: 'Jumbo Twist (Knee)',
        category: 'knee',
        price: 65,
        image: 'assets/images/gallery/img-30.jpg',
        description: 'Knee length twists.'
    },
    {
        id: 'knee5',
        name: 'Boho Knotless (Knee)',
        category: 'knee',
        price: 75,
        image: 'assets/images/gallery/img-31.jpg',
        description: 'Full bohemian look.'
    },
    {
        id: 'knee6',
        name: 'Senegalese Twists',
        category: 'knee',
        price: 70,
        image: 'assets/images/gallery/img-32.jpg',
        description: 'Smooth Senegalese twists.'
    },
    {
        id: 'knee7',
        name: 'Custom Freestyle (Knee)',
        category: 'knee',
        price: 80,
        image: 'assets/images/gallery/img-33.jpg',
        description: 'Freestyle artistic set.'
    },
    // OTHERS (fix_supply)
    {
        id: 'fs1',
        name: 'Installation & Sew In',
        category: 'other',
        price: 25,
        image: 'assets/images/gallery/img-5.jpg',
        description: 'Expert wig installation and sewing.'
    },
    {
        id: 'fs2',
        name: 'Full Hair Wash',
        category: 'other',
        price: 5,
        image: 'assets/images/gallery/img-6.jpg',
        description: 'Professional cleansing wash.'
    },
    {
        id: 'fs3',
        name: 'Wig Revamp',
        category: 'other',
        price: 30,
        image: 'assets/images/gallery/img-34.jpg',
        description: 'Restoring old wigs.'
    },
    {
        id: 'fs4',
        name: 'Custom Wig Construction',
        category: 'other',
        price: 100,
        image: 'assets/images/gallery/img-35.jpg',
        description: 'Handmade wig construction.'
    },
    {
        id: 'fs5',
        name: 'Frontal Re-Install',
        category: 'other',
        price: 40,
        image: 'assets/images/gallery/img-36.jpg',
        description: 'Frontal maintenance.'
    },
    {
        id: 'fs6',
        name: 'Silk Press & Treatment',
        category: 'other',
        price: 45,
        image: 'assets/images/gallery/img-37.jpg',
        description: 'Silky smooth finish.'
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
