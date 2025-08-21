
// =====================================================
//    NUTRICIÓN INFANTIL UCC - JAVASCRIPT PRINCIPAL
//    Funcionalidades: Animaciones, Contadores, Interactividad
// =====================================================

/**
 * Espera a que el DOM esté completamente cargado antes de ejecutar el código
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
    //    INICIALIZACIÓN DE TODAS LAS FUNCIONALIDADES
    // =====================================================
    initScrollAnimations();
    initCounterAnimations();
    initInteractiveCards();
    initAccessibilityFeatures();
    initSmoothScroll();
    
    console.log('✅ Nutrición Infantil UCC - Sistema cargado correctamente');
});

// =====================================================
//    ANIMACIONES AL HACER SCROLL
// =====================================================

/**
 * Inicializa las animaciones que se activan al hacer scroll
 */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    /**
     * Verifica qué elementos están visibles en pantalla y los anima
     */
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8; // 80% de la altura de la ventana
        
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < triggerPoint) {
                element.classList.add('animated');
            }
        });
    }
    
    // Event Listeners para scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', throttle(checkScroll, 100));
    
    // Ejecutar inmediatamente para elementos ya visibles
    checkScroll();
}

/**
 * Función throttle para optimizar el rendimiento del scroll
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Límite de tiempo en ms
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// =====================================================
//    ANIMACIÓN DE CONTADORES PARA DATOS IMPORTANTES
// =====================================================

/**
 * Inicializa las animaciones de contadores numéricos
 */
function initCounterAnimations() {
    let countersAnimated = false;
    
    /**
     * Anima los contadores cuando son visibles
     */
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        
        const counters = [
            { 
                element: document.getElementById('counter-1'), 
                target: 70, 
                suffix: '%',
                duration: 2000
            },
            { 
                element: document.getElementById('counter-2'), 
                target: 5, 
                suffix: '',
                duration: 1500
            },
            { 
                element: document.getElementById('counter-3'), 
                target: 15, 
                suffix: 'min',
                duration: 1800
            }
        ];
        
        counters.forEach(counter => {
            if (!counter.element) return;
            
            animateCounter(counter);
        });
    }
    
    /**
     * Anima un contador individual
     * @param {Object} counter - Objeto con configuración del contador
     */
    function animateCounter(counter) {
        let current = 0;
        const increment = counter.target / (counter.duration / 30);
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= counter.target) {
                current = counter.target;
                clearInterval(timer);
                
                // Añadir efecto de finalización
                counter.element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    counter.element.style.transform = 'scale(1)';
                }, 200);
            }
            
            counter.element.textContent = Math.floor(current) + counter.suffix;
        }, 30);
    }
    
    // Configurar observador para detectar visibilidad
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('datos-importantes')) {
                setTimeout(animateCounters, 500); // Pequeño delay para mejor efecto
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar la sección de datos importantes
    const datosSection = document.querySelector('.datos-importantes');
    if (datosSection) {
        observer.observe(datosSection);
    }
}

// =====================================================
//    EFECTOS INTERACTIVOS PARA CARDS
// =====================================================

/**
 * Inicializa la interactividad de las tarjetas
 */
function initInteractiveCards() {
    initMeriendaCards();
    initDatoCards();
    initTipCards();
}

/**
 * Configura interactividad para cards de meriendas
 */
function initMeriendaCards() {
    const meriendaCards = document.querySelectorAll('.merienda-card');
    
    meriendaCards.forEach((card, index) => {
        // Efecto click/tap
        card.addEventListener('click', function() {
            handleCardClick(this, index);
        });
        
        // Accesibilidad: soporte para teclado
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(this, index);
            }
        });
        
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Configura interactividad para cards de datos
 */
function initDatoCards() {
    const datoCards = document.querySelectorAll('.dato-card');
    
    datoCards.forEach(card => {
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                
                // Efecto de escalado
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.05)';
                }, 200);
            }
        });
        
        // Efecto de rotación sutil al hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

/**
 * Configura interactividad para tip cards
 */
function initTipCards() {
    const tipCards = document.querySelectorAll('.tip-card');
    
    tipCards.forEach(card => {
        card.addEventListener('click', function() {
            // Efecto de confirmación
            const icon = this.querySelector('i');
            const originalTransform = icon.style.transform;
            
            icon.style.transform = 'rotate(360deg) scale(1.3)';
            
            setTimeout(() => {
                icon.style.transform = originalTransform;
            }, 500);
        });
    });
}

// =====================================================
//    FUNCIONES DE ACCESIBILIDAD
// =====================================================

/**
 * Inicializa características de accesibilidad
 */
function initAccessibilityFeatures() {
    // Navegación por teclado mejorada
    document.addEventListener('keydown', function(e) {
        // Alt + H: ir al header
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Alt + M: ir al contenido principal
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Alt + F: ir al footer
        if (e.altKey && e.key === 'f') {
            e.preventDefault();
            document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Indicadores de foco mejorados
    const focusableElements = document.querySelectorAll('a, button, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #FF6B6B';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// =====================================================
//    SMOOTH SCROLL Y NAVEGACIÓN
// =====================================================

/**
 * Inicializa el scroll suave para enlaces internos
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar focus para accesibilidad
                target.focus();
            }
        });
    });
}

// =====================================================
//    SISTEMA DE NOTIFICACIONES
// =====================================================

/**
 * Muestra notificaciones temporales al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success', 'info', 'warning', 'error')
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Colores según el tipo
    const colors = {
        success: '#4CAF50',
        info: '#4ECDC4',
        warning: '#FFD166',
        error: '#FF6B6B'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// =====================================================
//    UTILIDADES GENERALES
// =====================================================

/**
 * Detecta si el usuario está en un dispositivo móvil
 * @returns {boolean}
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * Detecta si el usuario prefiere movimiento reducido
 * @returns {boolean}
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Ajusta animaciones según preferencias del usuario
 */
function adjustAnimationsForAccessibility() {
    if (prefersReducedMotion()) {
        // Desactivar animaciones para usuarios que prefieren movimiento reducido
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// =====================================================
//    EVENT LISTENERS GLOBALES
// =====================================================

// Ajustar animaciones al cargar
window.addEventListener('load', adjustAnimationsForAccessibility);

// Manejar cambios de orientación en móviles
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Manejar errores de imágenes
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Error cargando imagen:', e.target.src);
        e.target.style.opacity = '0.5';
        e.target.alt = 'Imagen no disponible';
    }
}, true);

// =====================================================
//    FUNCIONES DE DEBUG (solo en desarrollo)
// =====================================================

/**
 * Función de debug para desarrolladores
 */
function debugInfo() {
    console.log('🔍 Información de Debug - Nutrición Infantil UCC');
    console.log('📱 Es móvil:', isMobile());
    console.log('♿ Movimiento reducido:', prefersReducedMotion());
    console.log('📏 Tamaño ventana:', `${window.innerWidth}x${window.innerHeight}`);
    console.log('🎯 Elementos animados:', document.querySelectorAll('.animate-on-scroll').length);
    console.log('🏷️ Cards de merienda:', document.querySelectorAll('.merienda-card').length);
}

// Hacer disponible globalmente en desarrollo
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugNutricion = debugInfo;
    console.log('🚀 Modo desarrollo activado. Usa debugNutricion() para información de debug.');
}

