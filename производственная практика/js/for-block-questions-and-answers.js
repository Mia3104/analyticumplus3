document.addEventListener('DOMContentLoaded', function() {
    // Получаем все вопросы
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        const plusBtn = question.querySelector('.plus');
        const minusBtn = question.querySelector('.minus');
        const answer = question.querySelector('.answer');
        const blockQuestion = question.querySelector('.block-question');

        // Сохраняем исходные параметры
        const initialHeight = '120px';
        const expandedHeight = '189px';
        question.style.height = initialHeight;
        question.style.transition = 'height 0.3s ease';

        // Обработчик клика
        blockQuestion.addEventListener('click', function() {
            // Если ответ скрыт - показываем
            if (answer.style.display === 'none' || !answer.style.display) {
                // Плавное изменение высоты вопроса
                question.style.height = expandedHeight;

                // Плавное появление ответа
                answer.style.display = 'block';
                answer.style.height = '0';
                answer.style.opacity = '0';
                answer.style.overflow = 'hidden';

                setTimeout(() => {
                    answer.style.height = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                }, 10);

                // Меняем иконки
                plusBtn.style.display = 'none';
                minusBtn.style.display = 'block';
            }
            // Если ответ показан - скрываем
            else {
                // Плавное исчезновение ответа
                answer.style.height = '0';
                answer.style.opacity = '0';

                // После анимации скрытия ответа возвращаем высоту вопроса
                setTimeout(() => {
                    answer.style.display = 'none';
                    question.style.height = initialHeight;
                }, 300);

                // Меняем иконки
                plusBtn.style.display = 'block';
                minusBtn.style.display = 'none';
            }
        });

        // Инициализация - все ответы скрыты
        answer.style.display = 'none';
        minusBtn.style.display = 'none';
    });
});