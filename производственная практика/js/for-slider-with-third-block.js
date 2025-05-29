document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const navItems = document.querySelectorAll('.nav-block:not(.text):not(.line)');
    const navTexts = document.querySelectorAll('.nav-block.text');
    const sliders = document.querySelectorAll('.slider-for-third-block');
    const lineContainer = document.querySelector('.nav-with-slider');

    // Создаем подвижную линию
    const movingLine = document.createElement('div');
    movingLine.style.position = 'absolute';
    movingLine.style.bottom = '0';
    movingLine.style.height = '6px';
    movingLine.style.backgroundColor = 'rgba(189, 76, 200, 1)';
    movingLine.style.transition = 'all 0.3s ease';
    movingLine.style.borderRadius = '3px';
    lineContainer.style.position = 'relative';
    lineContainer.appendChild(movingLine);

    // Инициализация линии под первым элементом
    const firstNavItem = document.querySelector('.nav-block.one');
    if (firstNavItem) {
        const firstText = firstNavItem.querySelector('.nav-block.text');
        updateLinePosition(firstText);
    }

    // Функция для обновления позиции линии
    function updateLinePosition(textElement) {
        const textRect = textElement.getBoundingClientRect();
        const containerRect = lineContainer.getBoundingClientRect();

        movingLine.style.width = textRect.width + 'px';
        movingLine.style.left = (textRect.left - containerRect.left) + 'px';
    }

    // Обработчики для текстовых элементов
    navTexts.forEach(text => {
        text.style.cursor = 'pointer';

        text.addEventListener('click', function() {
            const parentBlock = text.closest('.nav-block');
            if (parentBlock) {
                parentBlock.click();
            }
        });
    });

    // Обработчики для навигационных элементов
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const blockClass = item.classList[1];

            // Обновляем позицию линии
            const textElement = item.querySelector('.nav-block.text');
            updateLinePosition(textElement);

            // Переключаем слайдеры
            sliders.forEach(slider => {
                slider.style.display = 'none';
            });

            const sliderToShow = document.querySelector(`.slider-for-third-block.${blockClass}`);
            if (sliderToShow) {
                sliderToShow.style.display = 'flex';
            }
        });
    });

    // Инициализация первого слайдера
    const firstSlider = document.querySelector('.slider-for-third-block.one');
    if (firstSlider) {
        firstSlider.style.display = 'flex';
    }
});