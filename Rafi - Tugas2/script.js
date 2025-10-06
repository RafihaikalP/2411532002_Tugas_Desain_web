document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu'); 

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active'); 
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    const animatedElements = document.querySelectorAll('.animated-element');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const category = document.getElementById('category').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent(`Pesan dari Portfolio - ${name}`);
            const body = encodeURIComponent(
                `Kategori: ${category}\n` +
                `Dari: ${name} (${email})\n\n` +
                `Isi Pesan:\n${message}`
            );
            const mailtoUrl = `mailto:rafidoang299@gmail.com?subject=${subject}&body=${body}`;

            window.location.href = mailtoUrl;

        });
    }

    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            if (parent && !parent.querySelector('.fallback-icon')) {
                const fallback = document.createElement('div');
                fallback.classList.add('fallback-icon');
                fallback.innerHTML = '<i class="fas fa-image"></i>';
                fallback.style.cssText = 'display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--accent-color); opacity: 0.3; height: 100%; min-height: 200px;';
                parent.prepend(fallback);
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
        
        lastScroll = currentScroll;
    });
});