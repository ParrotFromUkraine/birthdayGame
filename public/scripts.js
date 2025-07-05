const storySteps = [
    { hint: "Ваша задача: открыть дверь. Введите команду: open door", answer: "open door", response: "Дверь открыта. Вы вошли в комнату." },
    { hint: "Теперь найдите ключ. Введите команду: search key", answer: "search key", response: "Вы нашли ключ!" },
    { hint: "Используйте ключ, чтобы открыть сундук. Введите команду: use key", answer: "use key", response: "Сундук открыт. Поздравляем!" }
];

const easterEggs = [
    { trigger: "sudo love me baby", response: "Вы почувствовали присутствие попугая. Обернувшись вы видете как вас ласково обнимает попугайчик)))" },
    { trigger: "sudo rm sandwich", response: "Вы удалили всё что связоно с сендвичами. Теперь попугай не сможет кушать бутерброды..." },
    { trigger: "42", response: "Ответ на главный вопрос жизни, вселенной и всего такого..." }
];

let currentStep = 0;

const storyHint = document.getElementById('storyHint');
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');
const gameContainer = document.getElementById('gameContainer');
const blackScreen = document.getElementById('blackScreen');
const loadingText = document.getElementById('loadingText');

function updateHint() {
    if (currentStep < storySteps.length) {
        storyHint.textContent = storySteps[currentStep].hint;
    } else {
        storyHint.textContent = "Игра завершена!";
    }
}

function triggerWipeSequence() {
    gameContainer.style.display = 'none';
    blackScreen.style.display = 'flex';
    loadingText.textContent = "Удаление всех файлов...";

    setTimeout(() => {
        loadingText.textContent = "Система разрушена...";
    }, 2000);

    setTimeout(() => {
        loadingText.textContent = "Перезагрузка...";
    }, 4000);

    setTimeout(() => {
        loadingText.textContent = "Привет, Кира!";
    }, 6000);

    setTimeout(() => {
        terminalOutput.innerHTML = "";
        currentStep = 0;
        updateHint();

        blackScreen.style.display = 'none';
        gameContainer.style.display = 'block';
    }, 8000);
}

terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const userInput = terminalInput.value.trim();
        terminalOutput.innerHTML += `<div>&gt; ${userInput}</div>`;

        if (userInput === "sudo rm -rf /") {
            triggerWipeSequence();
        } else {
            const egg = easterEggs.find(egg => egg.trigger === userInput);
            if (egg) {
                terminalOutput.innerHTML += `<div class="easter-egg">${egg.response}</div>`;
            } else if (currentStep < storySteps.length && userInput === storySteps[currentStep].answer) {
                terminalOutput.innerHTML += `<div>${storySteps[currentStep].response}</div>`;
                currentStep++;
                updateHint();
            } else if (userInput !== "") {
                terminalOutput.innerHTML += `<div>Неизвестная команда. Попробуйте еще раз.</div>`;
            }
        }

        terminalInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

updateHint();