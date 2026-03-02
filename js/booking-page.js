/**
 * Haus of Beauty - Standalone Booking Page (6 Steps)
 * Self-contained: no dependency on shop.js
 */

// --- SERVICE DATA (mirrors shop products + general services) ---
const bookingServices = [
    // Braid Services
    { name: 'Knotless Braids', duration: '5 hours', price: 55.00, category: 'braid' },
    { name: 'Small Knotless Kids', duration: '4 hours', price: 55.00, category: 'braid' },
    { name: 'Goddess Braids', duration: '4 hours', price: 35.00, category: 'braid' },
    { name: 'Lemonade Braids', duration: '3 hours', price: 30.00, category: 'braid' },
    { name: 'Installation & Styling', duration: '3 hours', price: 45.00, category: 'braid' },
    { name: 'Nicole Unit', duration: '2 hours', price: 40.00, category: 'braid' },
    { name: 'Simple Installation', duration: '2 hours', price: 25.00, category: 'braid' },
    // General Services
    { name: 'Wash', duration: '30 min', price: 5.00, category: 'general' },
    { name: 'Wash Out', duration: '45 min', price: 10.00, category: 'general' },
    { name: 'Retouch', duration: '1 hour', price: 15.00, category: 'general' },
    { name: 'Retouch & Gel Up', duration: '1.5 hours', price: 30.00, category: 'general' },
    { name: 'Blow Out', duration: '45 min', price: 15.00, category: 'general' },
    { name: 'Installation', duration: '1.5 hours', price: 25.00, category: 'general' },
    { name: 'Sew In', duration: '1.5 hours', price: 20.00, category: 'general' }
];

document.addEventListener("DOMContentLoaded", () => {

    // --- STATE ---
    let currentStep = 1;
    let selectedService = null;
    let selectedPrice = null;

    // --- DOM Elements ---
    const progressList = document.getElementById('progressList');
    const summaryService = document.getElementById('summaryService');
    const summaryTime = document.getElementById('summaryTime');
    const servicesListContainer = document.getElementById('servicesList');

    // Fields
    const bookDate = document.getElementById('bookDate');
    const bookTime = document.getElementById('bookTime');
    const bookName = document.getElementById('bookName');
    const policyAgree = document.getElementById('policyAgree');

    // Final review
    const finalService = document.getElementById('finalService');
    const finalDateTime = document.getElementById('finalDateTime');
    const finalName = document.getElementById('finalName');
    const finalPrice = document.getElementById('finalPrice');

    // Buttons
    const btnTo4 = document.getElementById('btn-to-4');
    const btnTo6 = document.getElementById('btn-to-6');
    const confirmBtn = document.getElementById('confirmBtn');

    // --- STEP NAMES ---
    const stepNames = [
        "Welcome",
        "Our Work",
        "Select Service",
        "Date & Details",
        "Booking Policy",
        "Preparation"
    ];

    // --- Progress Sidebar ---
    function updateSidebar() {
        progressList.innerHTML = '';
        stepNames.forEach((name, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;

            let iconCode, textColor;

            if (isCompleted) {
                iconCode = '<i data-lucide="check-circle-2" class="w-5 h-5 text-white"></i>';
                textColor = 'text-white opacity-80';
            } else if (isActive) {
                iconCode = '<i data-lucide="circle-dot" class="w-5 h-5 text-white"></i>';
                textColor = 'text-white font-bold tracking-wide';
            } else {
                iconCode = '<i data-lucide="circle" class="w-5 h-5 text-white/30"></i>';
                textColor = 'text-white/30';
            }

            progressList.innerHTML += `
                <li class="flex items-center gap-4 ${textColor}">
                    ${iconCode}
                    <span class="text-sm uppercase tracking-widest">${name}</span>
                </li>
            `;
        });
        lucide.createIcons();
    }

    // --- Step Navigation ---
    function goToStep(step) {
        document.querySelectorAll('.step-panel').forEach(p => p.classList.add('hidden'));

        const target = document.getElementById(`step-${step}`);
        if (!target) return;
        target.classList.remove('hidden');

        gsap.fromTo(target.children,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
        );

        currentStep = (typeof step === 'number') ? step : currentStep;
        updateSidebar();

        // Populate final review on step 6
        if (step === 6) {
            finalService.textContent = selectedService || 'Not selected';
            finalPrice.textContent = selectedPrice ? `$${selectedPrice.toFixed(2)}` : '$0.00';
            finalDateTime.textContent = `${bookDate.value || 'TBD'} at ${bookTime.value || 'TBD'}`;
            finalName.textContent = bookName.value || 'Guest';
        }
    }

    // --- Render Services (Step 3) ---
    function renderServices() {
        servicesListContainer.innerHTML = '';

        const renderCategory = (title, items) => {
            let html = `<h4 class="font-bold text-sm tracking-wider uppercase mt-4 mb-2 text-gray-500">${title}</h4>`;
            items.forEach(item => {
                html += `
                    <div class="service-option border border-gray-200 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-black transition"
                         data-name="${item.name}" data-price="${item.price}">
                        <div>
                            <h3 class="font-bold text-gray-900">${item.name}</h3>
                            <p class="text-xs text-gray-500">${item.duration} &bull; $${item.price.toFixed(2)}</p>
                        </div>
                        <div class="w-6 h-6 border rounded-full border-gray-300 flex items-center justify-center radio-indicator"></div>
                    </div>
                `;
            });
            return html;
        };

        const braids = bookingServices.filter(s => s.category === 'braid');
        const general = bookingServices.filter(s => s.category === 'general');

        servicesListContainer.innerHTML = renderCategory("Braid Services", braids) + renderCategory("General Services", general);

        // Click handler for service selection
        document.querySelectorAll('.service-option').forEach(opt => {
            opt.addEventListener('click', function () {
                // Deselect all
                document.querySelectorAll('.service-option').forEach(o => {
                    o.classList.remove('border-black', 'bg-gray-50');
                    o.querySelector('.radio-indicator').innerHTML = '';
                    o.querySelector('.radio-indicator').classList.remove('border-black', 'bg-black');
                });

                // Select this
                this.classList.add('border-black', 'bg-gray-50');
                this.querySelector('.radio-indicator').classList.add('border-black', 'bg-black');
                this.querySelector('.radio-indicator').innerHTML = '<i data-lucide="check" class="w-4 h-4 text-white"></i>';

                selectedService = this.getAttribute('data-name');
                selectedPrice = parseFloat(this.getAttribute('data-price'));

                summaryService.innerHTML = `Service: <span class="text-white/60 font-normal">${selectedService}</span>`;
                btnTo4.disabled = false;
                btnTo4.classList.remove('opacity-50', 'cursor-not-allowed');

                lucide.createIcons();
            });
        });
    }

    // --- Button Listeners ---
    document.querySelectorAll('.next-step-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = parseInt(e.currentTarget.getAttribute('data-target'));

            // Validate details before going to policy
            if (target === 5) {
                if (!bookDate.value || !bookTime.value || !bookName.value) {
                    alert("Please fill in Date, Time, and Name.");
                    return;
                }
                summaryTime.innerHTML = `Time: <span class="text-white/60 font-normal">${bookDate.value} @ ${bookTime.value}</span>`;
            }
            goToStep(target);
        });
    });

    document.querySelectorAll('.prev-step-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            goToStep(parseInt(e.currentTarget.getAttribute('data-target')));
        });
    });

    // Policy checkbox
    policyAgree.addEventListener('change', (e) => {
        btnTo6.disabled = !e.target.checked;
        btnTo6.classList.toggle('opacity-50', !e.target.checked);
        btnTo6.classList.toggle('cursor-not-allowed', !e.target.checked);
    });

    // Confirm booking
    confirmBtn.addEventListener('click', () => {
        confirmBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Processing...';
        confirmBtn.disabled = true;
        lucide.createIcons();

        setTimeout(() => {
            goToStep('success');
        }, 1500);
    });

    // --- Initialize ---
    renderServices();
    goToStep(1);
});
