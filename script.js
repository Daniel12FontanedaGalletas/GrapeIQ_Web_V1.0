document.addEventListener('DOMContentLoaded', function() {

    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
    const contactForm = document.getElementById('contact-form');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    const hamburgerButton = document.getElementById('hamburger-button');
    const navLinks = document.getElementById('nav-links');

    hamburgerButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerButton.classList.toggle('active');
    });

    navLinks.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburgerButton.classList.remove('active');
        }
    });

    // --- CONFIGURACIÓN DE EMAILJS ---
    (function() {
        // 1. Pega aquí tu Public Key de tu cuenta de EmailJS
        emailjs.init("KEK0OVl_EV6Brp80t"); 
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
            
            // 2. Pega aquí tu Service ID (el de tu servicio de Zoho Mail)
            const serviceID = "zoho_service";
            // 3. Pega aquí tu Template ID (el de la plantilla de notificación para ti)
            const templateID = "template_df4frew";

            emailjs.sendForm(serviceID, templateID, this)
                .then(function() {
                    // Éxito al enviar: redirige a la página de gracias.
                    window.location.href = 'gracias.html';
                }, function(error) {
                    // Error al enviar
                    console.log('FALLO EN EL ENVÍO...', error);
                    submitButton.textContent = 'Solicitar Información'; // Restaura el texto del botón
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