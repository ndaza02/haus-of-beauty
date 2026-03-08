/**
 * Haus of Beauty - Supreme Touch Style Booking Flow
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- CATALOG DATA ---
    const services = [
        // Knotless Braids
        {
            id: 'knotless-xs', name: 'Knotless Extra Small', category: 'Knotless Braids', price: 35, lengths: [
                { name: 'Shoulder', price: 35, duration: '8 hrs' },
                { name: 'Bra', price: 40, duration: '8-10 hrs' },
                { name: 'Waist', price: 50, duration: '10-12 hrs' },
                { name: 'Butt', price: 65, duration: '12 hrs' },
                { name: 'Knee', price: 70, duration: '24 hrs' }
            ]
        },
        {
            id: 'knotless-s', name: 'Knotless Small', category: 'Knotless Braids', price: 30, lengths: [
                { name: 'Shoulder', price: 30, duration: '6 hrs' },
                { name: 'Bra', price: 35, duration: '6 hrs' },
                { name: 'Waist', price: 45, duration: '8 hrs' },
                { name: 'Butt', price: 55, duration: '8 hrs' },
                { name: 'Knee', price: 65, duration: '12 hrs' }
            ]
        },
        {
            id: 'knotless-m', name: 'Knotless Medium', category: 'Knotless Braids', price: 25, popular: true, lengths: [
                { name: 'Shoulder', price: 25, duration: '2-3 hrs' },
                { name: 'Bra', price: 30, duration: '2-3 hrs' },
                { name: 'Waist', price: 40, duration: '5 hrs' },
                { name: 'Butt', price: 45, duration: '5-7 hrs' },
                { name: 'Knee', price: 55, duration: '8 hrs' }
            ]
        },
        {
            id: 'knotless-l', name: 'Knotless Large', category: 'Knotless Braids', price: 20, lengths: [
                { name: 'Shoulder', price: 20, duration: '1 hr' },
                { name: 'Bra', price: 25, duration: '1 hr' },
                { name: 'Waist', price: 30, duration: '1-2 hrs' },
                { name: 'Butt', price: 35, duration: '1-2 hrs' },
                { name: 'Knee', price: 40, duration: '3-4 hrs' }
            ]
        },
        // Box Braids
        {
            id: 'box-xs', name: 'Box Braid Extra Small', category: 'Box Braids', price: 30, lengths: [
                { name: 'Shoulder', price: 30, duration: '5 hrs' },
                { name: 'Bra', price: 35, duration: '5 hrs' },
                { name: 'Waist', price: 40, duration: '6-8 hrs' },
                { name: 'Butt', price: 50, duration: '6-8 hrs' },
                { name: 'Knee', price: 65, duration: '10-12 hrs' }
            ]
        },
        {
            id: 'box-m', name: 'Box Braid Medium', category: 'Box Braids', price: 25, lengths: [
                { name: 'Shoulder', price: 25, duration: '3-4 hrs' },
                { name: 'Bra', price: 30, duration: '3-4 hrs' },
                { name: 'Waist', price: 35, duration: '3-4 hrs' },
                { name: 'Butt', price: 40, duration: '5-7 hrs' },
                { name: 'Knee', price: 50, duration: '8-10 hrs' }
            ]
        },
        {
            id: 'box-l', name: 'Box Braid Large', category: 'Box Braids', price: 20, lengths: [
                { name: 'Shoulder', price: 20, duration: '1 hr' },
                { name: 'Bra', price: 25, duration: '1 hr' },
                { name: 'Waist', price: 30, duration: '1h 30min' },
                { name: 'Butt', price: 35, duration: '1h 30min' },
                { name: 'Knee', price: 40, duration: '3-4 hrs' }
            ]
        },
        // Stylish Braids
        {
            id: 'lemonade', name: 'Lemonade Braids', category: 'Stylish Braids', price: 30, lengths: [
                { name: 'Shoulder', price: 30, duration: '1 hr' },
                { name: 'Bra', price: 35, duration: '1 hr' },
                { name: 'Waist', price: 40, duration: '2 hrs' },
                { name: 'Butt', price: 55, duration: '2-3 hrs' },
                { name: 'Knee', price: 65, duration: '3-4 hrs' }
            ]
        },
        {
            id: 'fulani', name: 'Fulani Braids', category: 'Stylish Braids', price: 30, lengths: [
                { name: 'Shoulder', price: 30, duration: '1h 30min' },
                { name: 'Bra', price: 35, duration: '1h 30min' },
                { name: 'Waist', price: 40, duration: '4 hrs' },
                { name: 'Butt', price: 55, duration: '4-6 hrs' },
                { name: 'Knee', price: 65, duration: '8 hrs' }
            ]
        },
        {
            id: 'alicia-keys', name: 'Alicia Keys', category: 'Stylish Braids', price: 15, lengths: [
                { name: 'Shoulder', price: 15, duration: '1 hr' },
                { name: 'Bra', price: 20, duration: '1 hr' },
                { name: 'Waist', price: 25, duration: '2 hrs' },
                { name: 'Butt', price: 30, duration: '2-3 hrs' },
                { name: 'Knee', price: 35, duration: '6 hrs' }
            ]
        },
        {
            id: 'bantu-knots', name: 'Bantu Knots', category: 'Stylish Braids', price: 15, lengths: [
                { name: 'Shoulder', price: 15, duration: '1h 30min' },
                { name: 'Bra', price: 20, duration: '1h 30min' },
                { name: 'Waist', price: 30, duration: '2-3 hrs' },
                { name: 'Butt', price: 45, duration: '6 hrs' },
                { name: 'Knee', price: 60, duration: '8 hrs' }
            ]
        },
        {
            id: 'invisible-locks', name: 'Invisible Locks', category: 'Stylish Braids', price: 15, lengths: [
                { name: 'Shoulder', price: 15, duration: '1h 30min' },
                { name: 'Bra', price: 20, duration: '1h 30min' },
                { name: 'Waist', price: 30, duration: '3 hrs' },
                { name: 'Butt', price: 45, duration: '5 hrs' },
                { name: 'Knee', price: 60, duration: '8 hrs' }
            ]
        },
        {
            id: 'boho-goddess', name: 'Boho & Goddess Braids', category: 'Stylish Braids', price: 40, lengths: [
                { name: 'Shoulder', price: 40, duration: '2 hrs' },
                { name: 'Bra', price: 40, duration: '2 hrs' },
                { name: 'Waist', price: 45, duration: '3-4 hrs' },
                { name: 'Butt', price: 55, duration: '6 hrs' },
                { name: 'Knee', price: 65, duration: '8 hrs' }
            ]
        },
        {
            id: 'butterfly', name: 'Butterfly Braids', category: 'Stylish Braids', price: 30, lengths: [
                { name: 'Shoulder', price: 30, duration: '2h 30min' },
                { name: 'Bra', price: 40, duration: '2h 30min' },
                { name: 'Waist', price: 45, duration: '3-4 hrs' },
                { name: 'Butt', price: 50, duration: '3-4 hrs' },
                { name: 'Knee', price: 65, duration: '6-8 hrs' }
            ]
        },
    ];

    const addons = [
        { id: 'wash', name: 'Luxury Wash & Condition', price: 15 },
        { id: 'detangle', name: 'Extra Detangling', price: 10 },
        { id: 'length-xtra', name: 'Extra Length (Waist)', price: 20 },
        { id: 'hair-curl', name: 'Curly Ends', price: 10 },
    ];

    const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM"];

    // --- STATE ---
    let bookingState = {
        currentStep: 1,
        selectedService: null,
        selectedLength: null,
        selectedDate: null,
        selectedTime: null,
        selectedAddons: [],
        customerInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        totalPrice: 0,
        deposit: 20
    };

    // --- DOM ELEMENTS ---
    const panels = document.querySelectorAll('.step-panel');
    const stepItems = document.querySelectorAll('.step-item');
    const stepProgress = document.getElementById('stepProgress');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // Summary elements
    const sumServiceName = document.getElementById('sumServiceName');
    const sumServiceDuration = document.getElementById('sumServiceDuration');
    const sumDateTime = document.getElementById('sumDateTime');
    const sumAddonsList = document.getElementById('sumAddonsList');
    const sumTotal = document.getElementById('sumTotal');
    const sumDeposit = document.getElementById('sumDeposit');

    // --- INITIALIZATION ---
    function init() {
        renderServices();
        renderAddons();
        renderTimeSlots();
        updateControls();
        updateSummary();

        // Loader hide
        const loader = document.getElementById('loader');
        if (loader) {
            const loaderImage = document.querySelector('.loader-image');
            if (loaderImage) {
                gsap.to(loaderImage, {
                    opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", delay: 0.2,
                    onComplete: () => {
                        setTimeout(() => {
                            gsap.to(loader, {
                                opacity: 0, duration: 0.6, ease: "power2.out",
                                onComplete: () => loader.style.display = 'none'
                            });
                        }, 1200);
                    }
                });
            } else {
                setTimeout(() => {
                    gsap.to(loader, {
                        opacity: 0, duration: 0.6, ease: "power2.out",
                        onComplete: () => loader.style.display = 'none'
                    });
                }, 1000);
            }
        }

        lucide.createIcons();
    }

    // --- RENDERING ---
    function renderServices() {
        const container = document.getElementById('serviceSelectionList');
        if (!container) return;

        // Group services by category
        const categories = {};
        services.forEach(svc => {
            if (!categories[svc.category]) categories[svc.category] = [];
            categories[svc.category].push(svc);
        });

        let html = '';
        for (const [catName, catServices] of Object.entries(categories)) {
            html += `<div class="mb-6">
                <h3 class="text-xs uppercase tracking-[0.2em] text-brand-muted mb-3 font-sans">${catName}</h3>
                <div class="space-y-3">`;
            catServices.forEach(svc => {
                const isSelected = bookingState.selectedService?.id === svc.id;
                html += `
                <div class="service-option bg-brand-surface border ${isSelected ? 'border-brand-gold ring-1 ring-brand-gold' : 'border-brand-border'} rounded-xl p-5 cursor-pointer hover:border-brand-gold transition-all group relative overflow-hidden" data-id="${svc.id}">
                    ${svc.popular ? '<div class="absolute top-0 right-0 bg-brand-gold text-brand-bg text-[8px] uppercase tracking-tighter font-bold px-2 py-1 rounded-bl-lg">Popular</div>' : ''}
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-heading text-lg group-hover:text-brand-gold transition-colors">${svc.name}</h3>
                        <span class="text-brand-gold font-bold text-sm">from $${svc.price}</span>
                    </div>
                    <div class="flex items-center gap-3 text-brand-muted text-[10px] uppercase tracking-wider">
                        <span class="flex items-center gap-1"><i data-lucide="tag" class="w-3 h-3"></i> ${svc.category}</span>
                        <span class="flex items-center gap-1"><i data-lucide="ruler" class="w-3 h-3"></i> 5 lengths</span>
                    </div>
                    ${isSelected && svc.lengths ? `
                    <div class="mt-4 pt-4 border-t border-brand-border length-picker">
                        <p class="text-xs text-brand-muted mb-2 font-medium">Select Length:</p>
                        <div class="grid grid-cols-1 gap-2">
                            ${svc.lengths.map(len => `
                                <div class="length-option flex justify-between items-center px-3 py-2 rounded-lg border cursor-pointer transition-all text-sm ${bookingState.selectedLength?.name === len.name ? 'border-brand-gold bg-brand-gold/10 text-brand-text' : 'border-brand-border hover:border-brand-gold/50 text-brand-muted'}" data-length="${len.name}" data-svc="${svc.id}">
                                    <span class="font-medium">${len.name}</span>
                                    <div class="flex items-center gap-3 text-xs">
                                        <span class="text-brand-muted">${len.duration}</span>
                                        <span class="text-brand-gold font-bold">$${len.price}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>` : ''}
                </div>`;
            });
            html += `</div></div>`;
        }

        container.innerHTML = html;

        // Service Selection Listener
        container.querySelectorAll('.service-option').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.closest('.length-option')) return;
                const id = el.dataset.id;
                if (bookingState.selectedService?.id === id) return;
                bookingState.selectedService = services.find(s => s.id === id);
                bookingState.selectedLength = null;
                renderServices();
                updateSummary();
                updateControls();
                lucide.createIcons();
            });
        });

        // Length Selection Listener
        container.querySelectorAll('.length-option').forEach(el => {
            el.addEventListener('click', () => {
                const lengthName = el.dataset.length;
                const svcId = el.dataset.svc;
                const svc = services.find(s => s.id === svcId);
                const len = svc.lengths.find(l => l.name === lengthName);
                bookingState.selectedLength = len;
                bookingState.selectedService = { ...svc, price: len.price, duration: len.duration };
                renderServices();
                updateSummary();
                updateControls();
                lucide.createIcons();
            });
        });
    }

    function renderAddons() {
        const container = document.getElementById('addonsList');
        if (!container) return;

        container.innerHTML = addons.map(addon => `
            <div class="addon-option bg-brand-surface border border-brand-border rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-brand-gold transition-all ${bookingState.selectedAddons.find(a => a.id === addon.id) ? 'border-brand-gold bg-brand-elevated' : ''}" 
                 data-id="${addon.id}">
                <div class="flex items-center gap-4">
                    <div class="w-5 h-5 rounded border border-brand-border flex items-center justify-center transition-all ${bookingState.selectedAddons.find(a => a.id === addon.id) ? 'bg-brand-gold border-brand-gold' : ''}">
                        ${bookingState.selectedAddons.find(a => a.id === addon.id) ? '<i data-lucide="check" class="w-3 h-3 text-brand-bg"></i>' : ''}
                    </div>
                    <span class="text-sm font-medium">${addon.name}</span>
                </div>
                <span class="text-brand-gold font-bold text-sm">+$${addon.price}</span>
            </div>
        `).join('');

        container.querySelectorAll('.addon-option').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.dataset.id;
                const addon = addons.find(a => a.id === id);
                const index = bookingState.selectedAddons.findIndex(a => a.id === id);

                if (index > -1) {
                    bookingState.selectedAddons.splice(index, 1);
                } else {
                    bookingState.selectedAddons.push(addon);
                }

                renderAddons();
                updateSummary();
                lucide.createIcons();
            });
        });
    }

    function renderTimeSlots() {
        const container = document.getElementById('timeSlotGrid');
        if (!container) return;

        container.innerHTML = timeSlots.map(time => `
            <button class="time-slot px-4 py-3 rounded-lg border border-brand-border text-sm text-brand-muted hover:border-brand-gold hover:text-brand-text transition-all ${bookingState.selectedTime === time ? 'bg-brand-gold text-brand-bg border-brand-gold font-bold' : ''}" 
                    data-time="${time}">
                ${time}
            </button>
        `).join('');

        container.querySelectorAll('.time-slot').forEach(el => {
            el.addEventListener('click', () => {
                bookingState.selectedTime = el.dataset.time;
                renderTimeSlots();
                updateSummary();
            });
        });
    }

    // --- NAVIGATION LOGIC ---
    function goToStep(step) {
        if (step > bookingState.currentStep && !validateStep(bookingState.currentStep)) return;

        const currentPanel = document.getElementById(`step-panel-${bookingState.currentStep}`);
        const nextPanel = document.getElementById(`step-panel-${step === 'success' ? 'success' : step}`);

        if (!nextPanel) return;

        // Animate Out
        gsap.to(currentPanel, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => {
                currentPanel.classList.add('hidden');
                nextPanel.classList.remove('hidden');

                // Animate In
                gsap.fromTo(nextPanel,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                );
            }
        });

        if (step !== 'success') {
            bookingState.currentStep = step;
            updateStepper();
            updateControls();

            // Hide/Show summary sidebar controls if success
            if (step === 'success') {
                document.getElementById('stepControls').classList.add('hidden');
            }
        } else {
            document.getElementById('stepControls').classList.add('hidden');
            // Hide progress stepper
            gsap.to('.mb-16', { opacity: 0, height: 0, marginBottom: 0, duration: 0.5 });
        }
    }

    function validateStep(step) {
        switch (step) {
            case 1:
                if (!bookingState.selectedService || !bookingState.selectedLength) {
                    alert('Please select a service and a length.');
                    return false;
                }
                return true;
            case 2:
                const dateVal = document.getElementById('bookDate').value;
                if (!dateVal || !bookingState.selectedTime) {
                    alert('Please select both a date and a time slot.');
                    return false;
                }
                bookingState.selectedDate = dateVal;
                return true;
            case 3:
                return true; // Add-ons are optional
            case 4:
                const fName = document.getElementById('firstName').value;
                const lName = document.getElementById('lastName').value;
                const email = document.getElementById('bookEmail').value;
                const phone = document.getElementById('bookPhone').value;

                if (!fName || !lName || !email || !phone) {
                    alert('Please fill in all personal details.');
                    return false;
                }
                bookingState.customerInfo = { firstName: fName, lastName: lName, email, phone };
                return true;
            case 5:
                if (!document.getElementById('policyAgree').checked) {
                    alert('You must agree to the booking policies.');
                    return false;
                }
                return true;
            default:
                return true;
        }
    }

    function updateStepper() {
        const percent = ((bookingState.currentStep - 1) / (stepItems.length - 1)) * 100;
        stepProgress.style.width = `${percent}%`;

        stepItems.forEach((item, i) => {
            const stepNum = i + 1;
            const icon = item.querySelector('.status-icon');

            if (stepNum < bookingState.currentStep) {
                item.classList.add('completed');
                item.classList.remove('active');
                icon.classList.add('border-brand-gold', 'text-brand-gold');
                icon.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i>';
            } else if (stepNum === bookingState.currentStep) {
                item.classList.add('active');
                item.classList.remove('completed');
                icon.classList.add('border-brand-gold', 'text-brand-text', 'bg-brand-elevated');
            } else {
                item.classList.remove('active', 'completed');
                icon.classList.remove('border-brand-gold', 'text-brand-gold', 'bg-brand-elevated', 'text-brand-text');
                // Restore original icons
                const originalIcons = ['sparkles', 'calendar', 'plus-square', 'user', 'credit-card'];
                icon.innerHTML = `<i data-lucide="${originalIcons[i]}" class="w-5 h-5"></i>`;
            }
        });
        lucide.createIcons();
    }

    function updateControls() {
        // Prev Button
        if (bookingState.currentStep > 1) {
            prevBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            prevBtn.classList.add('opacity-0', 'pointer-events-none');
        }

        // Next Button Text
        if (bookingState.currentStep === 5) {
            nextBtn.textContent = 'Confirm Booking';
        } else {
            nextBtn.textContent = 'Continue';
        }

        // Disable Continue if no service selected on step 1
        if (bookingState.currentStep === 1) {
            nextBtn.disabled = bookingState.selectedService === null;
        } else {
            nextBtn.disabled = false;
        }
    }

    function updateSummary() {
        // Service
        if (bookingState.selectedService) {
            sumServiceName.textContent = bookingState.selectedService.name;
            sumServiceDuration.textContent = bookingState.selectedService.duration;
            bookingState.totalPrice = bookingState.selectedService.price;
        }

        // Date/Time
        if (bookingState.selectedDate && bookingState.selectedTime) {
            const date = new Date(bookingState.selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            sumDateTime.textContent = `${date} @ ${bookingState.selectedTime}`;
        } else if (bookingState.selectedTime) {
            sumDateTime.textContent = `TBD @ ${bookingState.selectedTime}`;
        } else {
            sumDateTime.textContent = '--';
        }

        // Add-ons
        if (bookingState.selectedAddons.length > 0) {
            sumAddonsList.classList.remove('hidden');
            const addonPrice = bookingState.selectedAddons.reduce((sum, a) => sum + a.price, 0);
            bookingState.totalPrice += addonPrice;

            sumAddonsList.innerHTML = `
                <div class="text-brand-muted text-xs uppercase tracking-widest mb-1">Add-ons</div>
                ${bookingState.selectedAddons.map(a => `
                    <div class="flex justify-between text-[11px] text-brand-text font-light">
                        <span>${a.name}</span>
                        <span>+$${a.price}</span>
                    </div>
                `).join('')}
            `;
        } else {
            sumAddonsList.classList.add('hidden');
        }

        // Totals
        sumTotal.textContent = `$${bookingState.totalPrice.toFixed(2)}`;
        sumDeposit.textContent = `$${bookingState.deposit.toFixed(2)}`;
    }

    // --- EVENT LISTENERS ---
    nextBtn.addEventListener('click', () => {
        if (bookingState.currentStep === 5) {
            // Processing...
            nextBtn.disabled = true;
            nextBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i>';
            lucide.createIcons();

            setTimeout(() => {
                goToStep('success');
            }, 1500);
        } else {
            goToStep(bookingState.currentStep + 1);
        }
    });

    prevBtn.addEventListener('click', () => {
        goToStep(bookingState.currentStep - 1);
    });

    // Date change auto-update summary
    document.getElementById('bookDate').addEventListener('change', (e) => {
        bookingState.selectedDate = e.target.value;
        updateSummary();
    });

    // Start everything
    init();
});
