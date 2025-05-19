// Массив вопросов и ответов
const questions = [
    {
        question: "Какой оператор используется для объявления переменной в JavaScript?",
        answers: ["var", "let", "const", "Все перечисленные"],
        correct: 3,
        explanation: "В JavaScript можно использовать var, let и const для объявления переменных."
    },
    {
        question: "Какой метод используется для вывода информации в консоль?",
        answers: ["console.log()", "print()", "alert()", "document.write()"],
        correct: 0,
        explanation: "console.log() - стандартный метод для вывода в консоль браузера."
    },
    {
        question: "Какое значение возвращает typeof null?",
        answers: ["null", "object", "undefined", "number"],
        correct: 1,
        explanation: "Это известная особенность JavaScript - typeof null возвращает 'object'."
    },
    {
        question: "Что делает метод Array.prototype.map()?",
        answers: ["Изменяет исходный массив", "Создает новый массив с результатами вызова функции для каждого элемента", "Фильтрует элементы массива", "Сортирует массив"],
        correct: 1,
        explanation: "map() создает новый массив, вызывая функцию для каждого элемента исходного массива."
    },
    {
        question: "Как объявить функцию в JavaScript?",
        answers: ["function myFunc() {}", "const myFunc = function() {}", "const myFunc = () => {}", "Все варианты верны"],
        correct: 3,
        explanation: "В JavaScript есть несколько способов объявления функций."
    },
    {
        question: "Что такое замыкание (closure) в JavaScript?",
        answers: ["Способ хранения данных", "Функция вместе с лексическим окружением", "Специальный тип объекта", "Синтаксическая конструкция для классов"],
        correct: 1,
        explanation: "Замыкание - это функция вместе со всеми внешними переменными, которые ей доступны."
    },
    {
        question: "Какой оператор проверяет равенство по значению и типу?",
        answers: ["==", "===", "=", "!="],
        correct: 1,
        explanation: "Оператор === проверяет строгое равенство (по значению и типу)."
    },
    {
        question: "Что делает оператор spread (...) в JavaScript?",
        answers: ["Разворачивает элементы массива или объекта", "Объединяет массивы", "Копирует объекты", "Все варианты верны"],
        correct: 3,
        explanation: "Оператор spread имеет несколько применений для работы с массивами и объектами."
    },
    {
        question: "Какой метод преобразует JSON-строку в JavaScript-объект?",
        answers: ["JSON.parse()", "JSON.stringify()", "JSON.decode()", "JSON.toObject()"],
        correct: 0,
        explanation: "JSON.parse() преобразует строку JSON в JavaScript-объект."
    },
    {
        question: "Что такое Promise в JavaScript?",
        answers: ["Объект представляющий результат асинхронной операции", "Тип данных", "Способ объявления переменных", "Синтаксис для циклов"],
        correct: 0,
        explanation: "Promise - это объект, представляющий завершение или неудачу асинхронной операции."
    }
];

let currentQuestion = 0;
let score = 0;

// Получаем DOM элементы
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result");
const restartButton = document.getElementById("restart");

// Функция загрузки вопроса
function loadQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = `${currentQuestion + 1}. ${current.question}`;
    answersContainer.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer");
        button.onclick = () => checkAnswer(index);
        answersContainer.appendChild(button);
    });

    nextButton.style.display = "none";
}

// Проверка ответа
function checkAnswer(index) {
    const buttons = document.querySelectorAll(".answer");
    buttons.forEach(button => button.disabled = true);

    const current = questions[currentQuestion];
    
    if (index === current.correct) {
        buttons[index].classList.add("correct");
        score++;
    } else {
        buttons[index].classList.add("wrong");
        buttons[current.correct].classList.add("correct");
    }

    // Добавляем пояснение к ответу
    const explanation = document.createElement("div");
    explanation.textContent = current.explanation;
    explanation.style.marginTop = "10px";
    explanation.style.fontStyle = "italic";
    explanation.style.color = "#555";
    answersContainer.appendChild(explanation);

    nextButton.style.display = "block";
}

// Переход к следующему вопросу
nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Показ результатов
function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    resultContainer.style.display = "block";
    const percentage = Math.round((score / questions.length) * 100);
    resultText.textContent = `Вы ответили правильно на ${score} из ${questions.length} вопросов (${percentage}%).`;
    
    // Добавляем оценку
    const grade = document.createElement("p");
    if (percentage >= 90) grade.textContent = "Отличный результат! Вы отлично знаете JavaScript!";
    else if (percentage >= 70) grade.textContent = "Хороший результат! Продолжайте изучать JavaScript!";
    else if (percentage >= 50) grade.textContent = "Неплохо, но есть куда расти!";
    else grade.textContent = "Попробуйте еще раз и изучите материалы лучше!";
    grade.style.fontWeight = "bold";
    grade.style.marginTop = "20px";
    resultText.appendChild(grade);
}

// Перезапуск викторины
restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultContainer.style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
});

// Начало викторины
loadQuestion();
let timer;
const timeLimit = 15; // секунд на вопрос

function startTimer() {
    let timeLeft = timeLimit;
    const timerElement = document.createElement("div");
    timerElement.id = "timer";
    timerElement.style.margin = "10px 0";
    timerElement.style.fontWeight = "bold";
    answersContainer.parentNode.insertBefore(timerElement, answersContainer);
    
    timer = setInterval(() => {
        timerElement.textContent = `Осталось времени: ${timeLeft} сек.`;
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timer);
            timerElement.textContent = "Время вышло!";
            checkAnswer(-1); // Передаем неверный ответ
        }
    }, 1000);
}

// В функции loadQuestion() добавьте:
clearInterval(timer);
startTimer();