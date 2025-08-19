document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Configuración inicial para animaciones
    function resetAnimations() {
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }

    // Animación al hacer scroll
    function handleScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });

        animatedElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    resetAnimations();
    window.addEventListener('scroll', handleScroll);
    
    // Disparar animaciones iniciales
    setTimeout(() => {
        handleScroll();
    }, 100);
});
