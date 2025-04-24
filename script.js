document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('consultation-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Basic form validation
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const date = form.querySelector('input[type="date"]').value;

            if (name && email && date) {
                formMessage.textContent = "Appointment booked! We'll contact you soon.";
                formMessage.classList.add('text-green-600');
                form.reset();
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
            } else {
                formMessage.textContent = "Please fill in all fields.";
                formMessage.classList.add('text-red-600');
            }
        });
    }
});