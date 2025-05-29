document.addEventListener('DOMContentLoaded', function() {
    // Элементы формы
    const form = document.querySelector('.form-with-cooperation form');
    const nameInput = form.querySelector('input[type="text"][placeholder="Ваше имя*"]');
    const phoneInput = form.querySelector('input[type="text"][placeholder="+7 ***-***-** **"]');
    const emailInput = form.querySelector('input[type="text"][placeholder="E-mail"]');
    const commentTextarea = form.querySelector('textarea');
    const checkbox = form.querySelector('input[type="checkbox"]');
    const submitButton = form.querySelector('.cooperation-button button');

    // Флаг первого взаимодействия
    let formTouched = false;

    // Маска для телефона
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+7 ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');

            if (formTouched) validateForm();
        });
    }

    // Валидация формы
    function validateForm(forceShowErrors = false) {
        let isValid = true;

        // Проверка имени
        if (nameInput.value.trim() === '') {
            if (formTouched || forceShowErrors) {
                showError(nameInput, 'Поле обязательно для заполнения');
            }
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Проверка телефона
        const phoneRegex = /^\+7 \d{3}-\d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            if (formTouched || forceShowErrors) {
                showError(phoneInput, 'Введите корректный номер телефона');
            }
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        // Проверка чекбокса
        if (!checkbox.checked) {
            isValid = false;
        }

        // Активация/деактивация кнопки
        submitButton.disabled = !isValid;

        return isValid;
    }

    // Показ ошибки
    function showError(input, message) {
        clearError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'rgba(255, 120, 120, 1)';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        input.insertAdjacentElement('afterend', errorDiv);
        input.style.borderColor = 'rgba(255, 120, 120, 1)';
    }

    // Очистка ошибки
    function clearError(input) {
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
        // Важное изменение: сбрасываем цвет границы только если поле не в ошибке
        if (!(formTouched && input.value.trim() === '' && input.required)) {
            input.style.borderColor = 'rgba(239, 236, 246, 1)';
        }
    }

    // Обработчики событий
    [nameInput, phoneInput, emailInput, commentTextarea, checkbox].forEach(element => {
        element.addEventListener('focus', function() {
            if (!formTouched) {
                formTouched = true;
                // При первом взаимодействии сбрасываем красные границы
                [nameInput, phoneInput].forEach(input => {
                    input.style.borderColor = 'rgba(239, 236, 246, 1)';
                });
            }
        });
    });

    nameInput.addEventListener('blur', function() {
        if (formTouched && this.value.trim() === '') {
            showError(this, 'Поле обязательно для заполнения');
        }
        validateForm();
    });

    phoneInput.addEventListener('blur', function() {
        const phoneRegex = /^\+7 \d{3}-\d{3}-\d{2}-\d{2}$/;
        if (formTouched && !phoneRegex.test(this.value)) {
            showError(this, 'Введите корректный номер телефона');
        }
        validateForm();
    });

    checkbox.addEventListener('change', function() {
        validateForm();
    });

    // Инициализация формы
    function initForm() {
        // Устанавливаем чекбокс по умолчанию
        checkbox.checked = true;
        // Сбрасываем все красные границы
        [nameInput, phoneInput, emailInput, commentTextarea].forEach(input => {
            input.style.borderColor = 'rgba(239, 236, 246, 1)';
        });
        // Проверяем валидность без показа ошибок
        validateForm();
    }

    // Проверка формы при загрузке
    initForm();

    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formTouched = true; // При отправке считаем форму "тронутой"

        if (validateForm(true)) { // forceShowErrors = true
            // Здесь можно добавить отправку формы
            alert('Форма успешно отправлена!');
            form.reset();
            formTouched = false; // Сбрасываем флаг после отправки
            setTimeout(initForm, 0);
        }
    });

    // Проверка валидности при изменении полей
    [nameInput, phoneInput, emailInput, commentTextarea].forEach(input => {
        input.addEventListener('input', function() {
            if (formTouched) {
                clearError(this);
                validateForm();
            }
        });
    });
});