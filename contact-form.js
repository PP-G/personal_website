// Contact Form Handler
// Uses PHP backend to send emails via Web Host Canada

// Form elements
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitButton = contactForm.querySelector('button[type="submit"]');

// Language messages
const messages = {
    en: {
        success: 'Thank you for your message! I will get back to you soon.',
        error: 'Oops! Something went wrong. Please try again or contact me via LinkedIn.',
        rateLimit: 'Please wait a moment before submitting again.',
        sending: 'Sending...',
        send: 'Send Message'
    },
    fr: {
        success: 'Merci pour votre message! Je vous répondrai bientôt.',
        error: 'Oups! Une erreur s\'est produite. Veuillez réessayer ou me contacter via LinkedIn.',
        rateLimit: 'Veuillez patienter un moment avant de soumettre à nouveau.',
        sending: 'Envoi en cours...',
        send: 'Envoyer le message'
    }
};

// Get current language
function getCurrentLanguage() {
    return window.currentLang || 'en';
}

// Show message
function showMessage(type, messageKey, customMessage = null) {
    const lang = getCurrentLanguage();
    formMessage.textContent = customMessage || messages[lang][messageKey];
    formMessage.className = 'form-message show ' + type;
}

// Hide message
function hideMessage() {
    formMessage.className = 'form-message';
}

// Set button loading state
function setButtonLoading(loading) {
    if (loading) {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        const btnText = submitButton.querySelector('.btn-text');
        const lang = getCurrentLanguage();
        btnText.textContent = messages[lang].sending;
    } else {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        const btnText = submitButton.querySelector('.btn-text');
        const lang = getCurrentLanguage();
        btnText.textContent = messages[lang].send;
    }
}

// Handle form submission
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Hide any previous messages
    hideMessage();

    // Set loading state
    setButtonLoading(true);

    // Get form data
    const formData = new FormData(contactForm);

    try {
        // Submit to PHP backend
        const response = await fetch('submit-form.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Show success message
            showMessage('success', 'success');

            // Reset form
            contactForm.reset();
        } else {
            // Handle different error types
            if (response.status === 429) {
                // Rate limit error
                showMessage('error', 'rateLimit', data.message);
            } else {
                // Show error message
                console.error('Form submission error:', data);
                showMessage('error', 'error', data.message);
            }
        }
    } catch (error) {
        // Show error message
        console.error('Form submission error:', error);
        showMessage('error', 'error');
    } finally {
        // Remove loading state
        setButtonLoading(false);
    }
});

// Clear error message when user starts typing
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('input', function() {
        if (formMessage.classList.contains('error')) {
            hideMessage();
        }
    });
});
