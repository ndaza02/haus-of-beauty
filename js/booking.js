/**
 * Haus of Beauty - Booking Logic
 * Handles connection to Google Apps Script and UI state for the booking modal.
 */

// CONFIGURATION
const API_URL = 'https://script.google.com/macros/s/AKfycbyAesmcbbMILRdFRiuXlbHSlWqA1XB1IaMcCeT3KS45wyuacIvocFeDrU2L8RvI5J_M1w/exec';
const MOCK_MODE = false; // Live mode active!

// STATE
let currentStep = 1;
let bookingData = {
    service: null,
    date: null,
    time: null,
    name: null,
    phone: null,
    email: null,
    price: 0,
    duration: 0
};

// DOM ELEMENTS
const modal = document.getElementById('bookingModal');
const backdrop = document.getElementById('bookingBackdrop');
const panel = document.getElementById('bookingPanel');
const closeModalBtn = document.getElementById('closeModalBtn');
const progressBar = document.getElementById('progressBar');
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const summaryService = document.getElementById('summaryService');
const summaryDate = document.getElementById('summaryDate');
const summaryTime = document.getElementById('summaryTime');

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initializeServices();
    initializeDatePicker();
    setupEventListeners();
});

function setupEventListeners() {
    // Open Modal Triggers (Connects to all "Book Now" type buttons)
    document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.toLowerCase().includes('book')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
    });

    // Modal Controls
    closeModalBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Navigation
    nextBtn.addEventListener('click', handleNext);
    backBtn.addEventListener('click', handleBack);

    // Step 1: Service Selection
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', () => {
            selectService(option);
        });
    });

    // Form Inputs
    document.getElementById('bookingForm').addEventListener('input', () => {
        validateForm();
        validateStep();
    });

    // Close Success
    document.getElementById('closeSuccessBtn').addEventListener('click', () => {
        closeModal();
        setTimeout(resetBooking, 500);
    });
}

// ===== FLOW CONTROL =====

function openModal() {
    modal.classList.remove('hidden');
    // Animate in
    requestAnimationFrame(() => {
        backdrop.classList.remove('opacity-0');
        panel.classList.remove('opacity-0', 'translate-y-4');
    });
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    backdrop.classList.add('opacity-0');
    panel.classList.add('opacity-0', 'translate-y-4');

    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

function handleNext() {
    if (currentStep === 1) {
        if (!bookingData.service) return;
        goToStep(2);
    } else if (currentStep === 2) {
        if (!bookingData.date || !bookingData.time) return;
        goToStep(3);
    } else if (currentStep === 3) {
        if (!validateForm()) return;
        submitBooking();
    }
}

function handleBack() {
    if (currentStep > 1) {
        goToStep(currentStep - 1);
    }
}

function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));

    // Show new step
    document.getElementById(`step${step}`).classList.remove('hidden');

    // Update State
    currentStep = step;

    // Update UI
    updateProgressBar();
    updateButtons();

    // Specific Actions
    if (step === 2) {
        // Refresh date picker scroll if needed
    }
}

function updateProgressBar() {
    const progress = (currentStep / 3) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateButtons() {
    // Back Button
    if (currentStep === 1) {
        backBtn.classList.add('hidden');
    } else {
        backBtn.classList.remove('hidden');
    }

    // Next Button Text
    if (currentStep === 3) {
        nextBtn.innerHTML = `Confirm Booking <i data-lucide="check" class="w-4 h-4"></i>`;
    } else {
        nextBtn.innerHTML = `Next Step <i data-lucide="arrow-right" class="w-4 h-4"></i>`;
    }

    // Validation Check for Next Button
    validateStep();
}

function validateStep() {
    let isValid = false;
    if (currentStep === 1) isValid = !!bookingData.service;
    if (currentStep === 2) isValid = !!(bookingData.date && bookingData.time);
    if (currentStep === 3) isValid = validateForm(false); // Check without interacting

    nextBtn.disabled = !isValid;
    if (isValid) {
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// ===== STEP 1: SERVICES =====

function initializeServices() {
    // (Optional) Could populate from JS object if we wanted dynamic services
}

function selectService(element) {
    // Remove active class from others
    document.querySelectorAll('.service-option').forEach(el => el.classList.remove('border-black', 'bg-gray-50'));

    // Add active class
    element.classList.add('border-black', 'bg-gray-50');

    // Update Data
    bookingData.service = element.getAttribute('data-service');
    bookingData.price = element.getAttribute('data-price');
    bookingData.duration = element.getAttribute('data-duration');

    // Update Summary
    summaryService.innerHTML = `${bookingData.service}<br><span class="text-sm text-gray-400">$${bookingData.price} • ${bookingData.duration}</span>`;

    validateStep();
}


// ===== STEP 2: DATE & TIME =====

function initializeDatePicker() {
    const container = document.getElementById('dateContainer');
    const today = new Date();
    const daysToShow = 14; // Show next 2 weeks

    for (let i = 0; i < daysToShow; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        // Skip Sundays if closed
        if (date.getDay() === 0) continue;

        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNum = date.getDate();

        const btn = document.createElement('button');
        btn.className = `date-card min-w-[70px] p-3 rounded-xl border border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-black transition`;
        btn.innerHTML = `
            <span class="text-xs text-gray-500 uppercase font-bold">${dayName}</span>
            <span class="text-xl font-bold font-serif">${dayNum}</span>
        `;

        btn.addEventListener('click', () => selectDate(dateStr, btn));
        container.appendChild(btn);
    }
}

async function selectDate(dateStr, btnElement) {
    // UI Update
    document.querySelectorAll('.date-card').forEach(el => el.classList.remove('bg-black', 'text-white', 'border-black'));
    btnElement.classList.add('bg-black', 'text-white', 'border-black');
    btnElement.classList.remove('hover:border-black'); // remove hover effect to avoid conflict

    // Update Data
    bookingData.date = dateStr;
    summaryDate.innerText = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    // Reset Time
    bookingData.time = null;
    summaryTime.innerText = '-';
    validateStep();

    // Fetch Slots
    await fetchTimeSlots(dateStr);
}

async function fetchTimeSlots(date) {
    const grid = document.getElementById('timeSlotsGrid');
    grid.innerHTML = '<div class="col-span-3 text-center py-8"><div class="animate-spin w-6 h-6 border-2 border-black border-t-transparent rounded-full mx-auto"></div></div>';

    try {
        let bookedSlots = [];

        if (!MOCK_MODE && API_URL) {
            const response = await fetch(`${API_URL}?date=${date}`);
            const data = await response.json();
            if (data.success) {
                bookedSlots = data.bookedSlots;
            }
        } else {
            // Mock Data
            console.log('Using Mock Data for slots');
            if (Math.random() > 0.7) bookedSlots = ['10:00', '14:00'];
            await new Promise(r => setTimeout(r, 600)); // Fake delay
        }

        renderTimeSlots(bookedSlots);

    } catch (error) {
        console.error('Error fetching slots:', error);
        grid.innerHTML = '<div class="col-span-3 text-center text-red-500 text-sm">Could not load slots. Try again.</div>';
    }
}

function renderTimeSlots(bookedSlots) {
    const grid = document.getElementById('timeSlotsGrid');
    grid.innerHTML = '';

    const startHour = 9;
    const endHour = 17; // Last slot at 5 PM

    for (let h = startHour; h <= endHour; h++) {
        const time = `${h.toString().padStart(2, '0')}:00`;
        const isBooked = bookedSlots.includes(time);

        const btn = document.createElement('button');
        btn.className = `py-3 rounded-lg border text-sm font-medium transition ${isBooked
            ? 'bg-gray-100 text-gray-300 border-transparent cursor-not-allowed'
            : 'border-gray-200 hover:border-black'
            }`;
        btn.innerText = convertTo12Hour(time);
        btn.disabled = isBooked;

        if (!isBooked) {
            btn.addEventListener('click', () => selectTime(time, btn));
        }

        grid.appendChild(btn);
    }
}

function selectTime(time, btnElement) {
    document.querySelectorAll('#timeSlotsGrid button:not(:disabled)').forEach(el => {
        el.classList.remove('bg-black', 'text-white', 'border-black');
        el.classList.add('border-gray-200');
    });

    btnElement.classList.remove('border-gray-200');
    btnElement.classList.add('bg-black', 'text-white', 'border-black');

    bookingData.time = time;
    summaryTime.innerText = convertTo12Hour(time);
    validateStep();
}

function convertTo12Hour(time) {
    const [hours, mins] = time.split(':');
    const h = parseInt(hours);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${mins} ${suffix}`;
}

// ===== STEP 3: FORM =====

function validateForm(interact = true) {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const email = document.getElementById('clientEmail').value;

    bookingData.name = name;
    bookingData.phone = phone;
    bookingData.email = email;

    const isValid = name.length > 2 && phone.length > 5;
    return isValid;
}

async function submitBooking() {
    const nextBtn = document.getElementById('nextBtn');
    const originalText = nextBtn.innerHTML;

    // Loading State
    nextBtn.disabled = true;
    nextBtn.innerHTML = `<div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full font-bold"></div> Processing...`;

    try {
        if (!MOCK_MODE && API_URL) {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(bookingData),
                // mode: 'no-cors' // Sometimes needed for GAS but prevents reading response
            });
            const result = await response.json();

            if (!result.success && !result.id) throw new Error(result.error);
        } else {
            console.log('Mock Booking Submitted:', bookingData);
            await new Promise(r => setTimeout(r, 1500)); // Fake processing
        }

        // Success
        document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
        document.getElementById('stepSuccess').classList.remove('hidden');
        document.getElementById('modalButtons').classList.add('hidden'); // Hide nav buttons

    } catch (error) {
        console.error('Booking failed:', error);
        alert('Booking failed. Please try again or call us directly.');
        nextBtn.innerHTML = originalText;
        nextBtn.disabled = false;
    }
}

function resetBooking() {
    // Reset Data
    bookingData = { service: null, date: null, time: null, name: null, phone: null, email: null, price: 0, duration: 0 };
    currentStep = 1;

    // Reset UI
    document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('modalButtons').classList.remove('hidden');
    document.getElementById('stepSuccess').classList.add('hidden');

    // Clear selections
    document.querySelectorAll('.service-option').forEach(el => el.classList.remove('border-black', 'bg-gray-50'));
    document.getElementById('summaryService').innerText = 'Select a service';
    document.getElementById('summaryDate').innerText = '-';
    document.getElementById('summaryTime').innerText = '-';
    document.getElementById('bookingForm').reset();

    updateProgressBar();
    updateButtons();
}
