// Инициализация Fancybox
Fancybox.bind("[data-fancybox]", {
    autoFocus: false,
    placeFocusBack: false,
    closeButton: false,
    mainClass: "modal__container",
    on: {
        beforeShow: (fancybox) => {
            Fancybox.getInstance().close();
        }
    }
});

// Функция для инициализации маски телефона
function initPhoneMask() {
    // Проверяем, подключена ли библиотека Inputmask
    if (typeof Inputmask !== 'undefined') {
        // Инициализируем маску для всех полей с классом phone-mask
        Inputmask({
            mask: '+7 (999) 999-99-99',
            placeholder: '_',
            showMaskOnHover: false,
            showMaskOnFocus: true,
            clearIncomplete: true,
            clearMaskOnLostFocus: false,
            onBeforePaste: function (pastedValue, opts) {
                // Очищаем вставляемое значение от всего, кроме цифр
                const processedValue = pastedValue.replace(/\D/g, '');
                // Если номер начинается с 7 или 8, заменяем на +7
                if (processedValue.startsWith('7') || processedValue.startsWith('8')) {
                    return '+7' + processedValue.substring(1);
                }
                // Если номер начинается не с 7 или 8, добавляем +7
                return '+7' + processedValue;
            }
        }).mask(document.querySelectorAll('.phone-mask'));
    } else {
        console.error('Inputmask library is not loaded!');
    }
}

// Обработчик отправки формы
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const phoneInput = form.querySelector('.phone-mask');
    let phoneValue = '';

    // Получаем значение телефона
    if (phoneInput.inputmask) {
        phoneValue = phoneInput.inputmask.unmaskedvalue();
    } else {
        // Если маска не применилась, берем raw value и очищаем
        phoneValue = phoneInput.value.replace(/\D/g, '').substring(1);
    }

    // Валидация телефона (ровно 10 цифр)
    if (phoneValue.length !== 10) {
        alert('Пожалуйста, введите корректный номер телефона (10 цифр)');
        phoneInput.focus();
        return;
    }

    // Форматируем телефон для отправки
    const formattedPhone = '+7' + phoneValue;
    console.log('Форма отправлена. Телефон:', formattedPhone);

    // Здесь должна быть AJAX-отправка формы
    // Для демонстрации просто закрываем и показываем успех
    Fancybox.close();
    Fancybox.show([{ src: "#success-modal", type: "inline" }]);

    // Очищаем форму
    form.reset();

    // Переинициализируем маску после сброса
    initPhoneMask();
}

// Инициализация при полной загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем маску телефона
    initPhoneMask();

    // Находим форму и вешаем обработчик
    const form = document.querySelector('.modal__form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Автозакрытие модалки успеха через 3 секунды
    document.addEventListener('fancybox:show', (event) => {
        if (event.$container && event.$container[0].id === 'success-modal') {
            setTimeout(() => {
                Fancybox.close();
            }, 3000);
        }
    });
});