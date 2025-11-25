// Language Management Utility
// Handles language persistence across pages using localStorage

// Get saved language or default to 'en'
function getSavedLanguage() {
    return localStorage.getItem('preferredLanguage') || 'en';
}

// Save language preference
function saveLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

// Update all translatable elements on the page
function updatePageLanguage(lang) {
    // Update HTML lang attribute for screen readers
    document.documentElement.lang = lang;

    // Update all elements with data-en and data-fr attributes
    const elements = document.querySelectorAll('[data-en][data-fr]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });

    // Update placeholders
    const inputsWithPlaceholder = document.querySelectorAll('[data-placeholder-en][data-placeholder-fr]');
    inputsWithPlaceholder.forEach(input => {
        const placeholder = input.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });
}

// Initialize language on page load
function initializeLanguage() {
    const savedLang = getSavedLanguage();

    // Apply saved language immediately (before DOMContentLoaded to prevent flicker)
    if (savedLang !== 'en') {
        updatePageLanguage(savedLang);
    }

    return savedLang;
}

// Setup language toggle button
function setupLanguageToggle(currentLang) {
    const langBtn = document.getElementById('langBtn');
    const langText = document.querySelector('.lang-text');

    if (!langBtn || !langText) return currentLang;

    // Set initial button text
    langText.textContent = currentLang === 'en' ? 'FR' : 'EN';

    // Toggle language on button click
    langBtn.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'fr' : 'en';
        langText.textContent = currentLang === 'en' ? 'FR' : 'EN';

        // Save preference
        saveLanguage(currentLang);

        // Update page
        updatePageLanguage(currentLang);

        // Dispatch custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: currentLang } }));
    });

    return currentLang;
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.LanguageManager = {
        getSavedLanguage,
        saveLanguage,
        updatePageLanguage,
        initializeLanguage,
        setupLanguageToggle
    };
}
