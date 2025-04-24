document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('consultation-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            document.getElementById('form-message').textContent = "Appointment booked! We'll contact you soon.";
            form.reset();
        });
    }
});
