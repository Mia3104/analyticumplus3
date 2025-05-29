document.addEventListener('DOMContentLoaded', () => {
    const navSlider = document.getElementById('nav-slider');
    if (!navSlider) return;

    const scrollAmount = 100;

    const leftArrow = document.querySelector('.arrow-btn.left-arrow');
    const rightArrow = document.querySelector('.arrow-btn.right-arrow');

    leftArrow.addEventListener('click', () => {
        navSlider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        navSlider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});