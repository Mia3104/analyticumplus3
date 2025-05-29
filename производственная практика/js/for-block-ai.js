document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Swiper
    const aiSwiper = new Swiper('.block-about-ai .swiper-container', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 0,

        pagination: {
            el: '.block-about-ai .swiper-pagination',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: function (index, className) {
                return '<div class="' + className + '"></div>';
            },
        },

        // Опционально: настройки для тачпада
        touchEventsTarget: 'container',
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,

        on: {
            init: function() {
                console.log('AI Slider initialized');
            }
        }
    });
});