document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', function () {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
    }
});