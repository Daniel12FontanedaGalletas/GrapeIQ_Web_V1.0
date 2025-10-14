document.addEventListener('DOMContentLoaded', function() {

    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
    });

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const currentContent = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            document.querySelectorAll('.accordion-item').forEach(item => {
                item.querySelector('.accordion-header').classList.remove('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = null;
                content.style.padding = '0 1.5rem';
            });

            if (!isActive) {
                this.classList.add('active');
                currentContent.style.padding = '0.5rem 1.5rem 1.2rem 1.5rem';
                currentContent.style.maxHeight = currentContent.scrollHeight + "px";
            }
        });
    });
});