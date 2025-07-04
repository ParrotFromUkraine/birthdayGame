const storySteps = [
    { hint: "Ваша задача: открыть дверь. Введите команду: open door", answer: "open door", response: "Дверь открыта. Вы вошли в комнату." },
    { hint: "Теперь найдите ключ. Введите команду: search key", answer: "search key", response: "Вы нашли ключ!" },
    { hint: "Используйте ключ, чтобы открыть сундук. Введите команду: use key", answer: "use key", response: "Сундук открыт. Поздравляем!" }
];
let currentStep = 0;

const storyHint = document.getElementById('storyHint');
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');

function updateHint() {
    if (currentStep < storySteps.length) {
        storyHint.textContent = storySteps[currentStep].hint;
    } else {
        storyHint.textContent = "Игра завершена!";
    }
}

terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const userInput = terminalInput.value.trim();
        terminalOutput.innerHTML += `<div>&gt; ${userInput}</div>`;
        if (currentStep < storySteps.length && userInput === storySteps[currentStep].answer) {
            terminalOutput.innerHTML += `<div>${storySteps[currentStep].response}</div>`;
            currentStep++;
            updateHint();
        } else if (userInput !== "") {
            terminalOutput.innerHTML += `<div>Неизвестная команда. Попробуйте еще раз.</div>`;
        }
        terminalInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

updateHint();