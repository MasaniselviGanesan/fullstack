 // Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Hero Section Background Effect
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    let offset = window.pageYOffset;
    heroSection.style.backgroundPositionY = `${offset * 0.5}px`;
});
