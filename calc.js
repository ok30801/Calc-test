let numOne = document.querySelector('#num-1'),
    numTwo = document.querySelector('#num-2'),
    mathSign = document.querySelector('#math-sign'),
    mathResult = document.querySelector('#math-result'),
    result = document.querySelector('.result'),
    resultBtn = document.querySelector('#result-btn'),
    clearBtn = document.querySelector('#clear'),
    mathButtons = document.querySelectorAll('.btn'),
    closePanel = document.querySelector('.close-history-panel'),
    openHistory = document.querySelector('.open-history-panel'),
    historyPanel = document.querySelector('.history-panel'),
    historyList = document.querySelector('.history-list'),
    copyHistory = document.querySelector('.copy-history');

let historySection = document.querySelector('.history-section');

// Отменяем выделение текста на кнопках математической оперции и (=)

mathSign.onmousedown = mathSign.onselectstart = function() {
    return false;
}
mathResult.onmousedown = mathResult.onselectstart = function() {
    return false;
}

// Выводим знак математической операции при клике кнопок в поле (mathSign)

for(let i = 0; i < mathButtons.length; i++) {
    mathButtons[i].addEventListener('click', () => {
        mathSign.value = mathButtons[i].value;
        mathSign.style.border = '1px solid #1277AB';
        mathSign.style.color = '#1277AB';
    });
}

// Очистка полей
clearBtn.addEventListener('click', () => {
    numOne.value = '';
    numTwo.value = '';
    mathSign.value = '';
    mathSign.style.border = '1px solid #cdcdcd';
    result.innerHTML = '';
})

// Запись вычислений

let computeArr = [];

if (localStorage.getItem('computeArr')) {
    computeArr = JSON.parse(localStorage.getItem('computeArr'));
    showHistory();
}

resultBtn.addEventListener('click', () => {

    if (mathSign.value === '+') {
        result.innerHTML = +numOne.value + +numTwo.value;
    } else if(mathSign.value === '-') {
        result.innerHTML = +numOne.value - +numTwo.value;
    } else if(mathSign.value === '*') {
        result.innerHTML = +numOne.value * +numTwo.value;
    } else if(mathSign.value === '/') {
        result.innerHTML = (+numOne.value / +numTwo.value).toFixed(4);
        /*alert(result.innerHTML.toFixed(3));*/
    }

    let mathObj = {
        numberOne: numOne.value,
        mathSign: mathSign.value,
        numberTwo: numTwo.value,
        mathResult: mathResult.value,
        result: +result.innerHTML
    }
    computeArr.push(mathObj);

    showHistory()
    localStorage.setItem('computeArr', JSON.stringify(computeArr));

    if(result.innerHTML < 0) {
        result.style.background = 'red';
        result.style.color = "white";
    } else if(result.innerHTML == 0) {
        result.style.background = "white";
        result.style.color = "black";
    } else if(result.innerHTML / Math.floor(+result.innerHTML) !==1 ) {
        result.style.background = "yellow";
        result.style.color = "black";
    } else if(result.innerHTML > 0) {
        result.style.background = "green";
        result.style.color = "white";
    }
    /*if(result.innerHTML % 10 === 0) {
        alert('test');
    }else {
        /!*alert('false');*!/
    }*/
})

function showHistory() {

    let showHistory = '';
    computeArr.forEach((item, index) => {
        showHistory += `
            <li class="list">
                <div id='item_${index}'>${item.numberOne}</div>
                <div id='item_${index}'>${item.mathSign}</div>
                <div id='item_${index}'>${item.numberTwo}</div>
                <div id='item_${index}'>${item.mathResult}</div>
                <div id='item_${index}'>${item.result}</div>
            </li>
        `;
        historyList.innerHTML = showHistory;
    });
}

// Закрытие панели истории вычислений

closePanel.addEventListener('click', () => {
    historySection.style.display = 'none';
});

// Удаление истории вычислений

deleteHistoryAll = document.querySelector('.delete');
deleteHistoryAll.addEventListener('click', () => {
    localStorage.clear();
    historyList.innerHTML = '';
    setTimeout(function () {
        location.reload()
    }, 1000);
});

// Открытие панели истории вычислений

openHistory.addEventListener('click', () => {
    historySection.style.display = 'block';
    localStorage.getItem(JSON.parse(JSON.stringify(computeArr)));
});

// Копирование в буфер обмена

copyHistory.addEventListener('click', () => {
        navigator.clipboard.writeText(historyList.innerText)
            .then(() => copyHistory.classList.add('copy-done'));
});

// Drag-and-Drop

// Удаление одиночной записи

/*deleteHistoryItem = document.querySelectorAll('.fa-trash-o');

deleteHistoryItem.forEach((item, i) => {

    item.addEventListener('click', (e) => {
        if(e.target === item) {
            computeArr.splice(i, 1);
        }
        localStorage.setItem('computeArr', JSON.stringify(computeArr));
        location.reload();
        showHistory();
        localStorage.getItem(JSON.parse(computeArr))
        historySection.style.display = 'block';
    });
});*/
