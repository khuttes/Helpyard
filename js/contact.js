document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');
    
    // -----------------------------------------------------------
    // INSTRUCTION: Paste the Web App URL you got from Google Apps Script below
    // -----------------------------------------------------------
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwNTBRHQSUKwr8OcP1hdrGSmxBm0ZBCu9GdzCB8Rkgk7Ksm4Pq6OE4zF7aUuQrH3exp/exec';

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            // Check if URL is configured
            if (!GOOGLE_SCRIPT_URL || !GOOGLE_SCRIPT_URL.includes('script.google.com')) {
                statusMsg.textContent = "Configuration Error: Invalid URL in js/contact.js. It must start with 'https://script.google.com/...'";
                statusMsg.className = 'form-status error';
                statusMsg.style.color = '#f44336';
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            statusMsg.textContent = '';
            statusMsg.className = 'form-status';

            // Collect form data
            const formData = new FormData(form);

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            })
            .then(response => {
                // Google Scripts returns a redirect, which fetch follows. 
                // With no-cors, the response is opaque and we cannot check response.ok.
                // We assume success if the network request completes.
                statusMsg.textContent = "Message sent successfully! I'll get back to you soon.";
                statusMsg.classList.add('success');
                statusMsg.style.color = '#4caf50'; // Green
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                statusMsg.textContent = "Error sending message. Please try again later or email me directly.";
                statusMsg.classList.add('error');
                statusMsg.style.color = '#f44336'; // Red
            })
            .finally(() => {
                // Reset button state
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }
});