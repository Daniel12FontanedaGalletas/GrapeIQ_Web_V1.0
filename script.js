document.addEventListener('DOMContentLoaded', function() {

    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // --- NUEVO CÓDIGO PARA EL MENÚ HAMBURGUESA ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const navLinks = document.getElementById('nav-links');

    hamburgerButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerButton.classList.toggle('active');
    });

    // Cierra el menú al hacer clic en un enlace (para móviles)
    navLinks.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburgerButton.classList.remove('active');
        }
    });
    // --- FIN DEL NUEVO CÓDIGO ---


    // Inicializar EmailJS con tu Public Key
    (function() {
        // Sustituye las comillas por tu Public Key de EmailJS
        emailjs.init("YOUR_PUBLIC_KEY"); 
    })();

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

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitButton = contactForm.querySelector('.animated-button .text');
            submitButton.textContent = 'Enviando...';

            // Envía el formulario usando EmailJS
            // Sustituye las comillas por tu Service ID y Template ID
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    // Éxito al enviar
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                }, function(error) {
                    // Error al enviar
                    console.log('FALLO EN EL ENVÍO...', error);
                    submitButton.textContent = 'Enviar Solicitud'; // Restaura el texto del botón
                    alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
                });
        });
    }


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