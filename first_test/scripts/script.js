const addButton = document.getElementById('add-button')
const sortByNameButton = document.getElementById('sort_by_name-button');
const sortByValueButton = document.getElementById('sort_by_value-button');
const deleteButton = document.getElementById('delete-button');

const input = document.getElementById('input-pair');
const pairsList = document.getElementById('pairs-list');

let pairsArray = JSON.parse(localStorage.getItem('pairsList'))||[]; // створення масиву або присвоєння йому збережених данних
showArrayInList(pairsArray, pairsList); // Вивід даних

// При натисканні на "Enter" викликати функцію addButton.click()
input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        addButton.click();
    }
});

// Натискання на кнопку "add"
addButton.addEventListener('click', (e) => {
    const regex = /^\s*([a-zA-Z][a-zA-Z0-9]*)\s*=\s*([a-zA-Z0-9]+)\s*$/; // Регулярний вираз поля вводу
    let inputValue = input.value; // Отримання даних з поля вводу

    // Перевірка коректності вводу
    if (inputValue.match(regex)) {
        let name = inputValue.match(regex)[1]; // Назва пари
        let value = inputValue.match(regex)[2]; // Значення пари

        let existingIndex = pairsArray.findIndex(item => item.name === name); // Перевірка чи не існує пари з аналогічним ключем

        if (existingIndex !== -1) { // Якщо існує перезаписати пару в масиві та вивести повідомлення що пару перезаписано
            pairsArray[existingIndex].value = value;
            warningMessage("#f6e074", "#f3efbd", "These pairs have been overwritten!");
        } else { // Інакше додати пару до масиву
            pairsArray.push(new PairsConstructor(name, value));
        }

        // Вивід пар в список та збереження масиву
        showArrayInList(pairsArray, pairsList);
        saveArray(pairsArray);
    }else{ // Якщо дані введено неправильно виклик повідомлення про помилку
        warningMessage("#f67474", "#f3bdbd", "The input field is filled incorrectly! <br> <b>Correct: &ltname&gt = &ltvalue&gt</b>");
    }

    input.value = ""; // Очищення поля вводу
})

// Натискання на кнопку "sort_by_name"
sortByNameButton.addEventListener('click', (e) => {
    pairsArray.sort((a, b) => a.name.localeCompare(b.name)); // Сортування масиву по name
    showArrayInList(pairsArray, pairsList); // Вивід пар
})

// Натискання на кнопку "sort_by_value"
sortByValueButton.addEventListener('click', (e) => {
    pairsArray.sort((a, b) => a.value.localeCompare(b.value)); // Сортування масиву по value
    showArrayInList(pairsArray, pairsList); // Вивід пар
})

// Натискання на кнопку "delete"
deleteButton.addEventListener('click', (e) => {
    // Перебір списку з кінця
    for (let i = pairsList.options.length - 1; i >= 0; i--) {
        if (pairsList.options[i].selected) { // Якщо є вибрана пара то видалити її
            pairsArray = pairsArray.filter(item => item.name !== pairsList.options[i].value); // Фільтрація масиву від обраної пари
            pairsList.remove(i); // Видалення пари з масиву
        }
    }
    saveArray(pairsArray); // Збереження масиву
})


// Функція конструктор об'єкта пари
function PairsConstructor(name, value) {
    this.name = name;
    this.value = value;
}

// Функція для виводу даних
function showArrayInList(array, list) {
    list.innerHTML = ""; // Очищення поля виводу

    // Цикл для виводу пар
    for (const item of array) {
        const option = new Option(item.name + "=" + item.value, "" + item.name);
        list.add(option);
    }
}

// Функція збереження масиву
function saveArray(array) {
    localStorage.setItem("pairsList", JSON.stringify(array));
}

// Функція виводу попередження
function warningMessage(colorHead, colorMassage, message) {
    // Створення плашки попередження
    const divWarningMessage = document.createElement("div");
    const divWarningMessageHead = document.createElement("div");
    const messageText = document.createElement("p");

    divWarningMessage.classList.add("warning-message");
    divWarningMessageHead.classList.add("warning-message-head");
    messageText.classList.add("message-text");

    divWarningMessage.appendChild(divWarningMessageHead);
    divWarningMessage.appendChild(messageText);
    document.body.appendChild(divWarningMessage);

    // Додавання даних та стилю плашки
    divWarningMessage.style.backgroundColor = colorMassage;
    divWarningMessageHead.style.backgroundColor = colorHead;
    divWarningMessageHead.innerText = `!Warning!`;
    messageText.innerHTML = message;

    // Знищення плашки через 4 секунди
    setTimeout(() => {
        divWarningMessage.remove();
    }, 4000);
}



