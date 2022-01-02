const show = data => console.log(data);

const button = document.getElementsByClassName('submit_button');
const inputDisplay = document.getElementsByClassName('input_display');
const ul = document.getElementById('table');

function validateField(field) {
    if (!field) {
        let li = document.createElement('li');
        li.innerHTML = 'Введите сумму которую хотите конвертировать!';
        li.style = 'color: red';
        ul.append(li);
    } else {
        request(`http://localhost:3000/convert/${field}`).then((req, res) => {
            build(req);
        });
    }
}

async function request(url, method = 'GET') {
    try {
        const response = await fetch(url, {
            method
        });

        return await response.json();
    } catch (e) {
        show(`Oops, error! ==> ${e}`);
    }
}

function build(obj) {
    const uah = obj.uah;

    ul.innerHTML = "";

    for (let [key, value] of Object.entries(obj)) {
        if (key === 'uah') {
            continue
        }
        let li = document.createElement('li');
        li.innerHTML = `${uah} UAH ===> ${value} ${key.toUpperCase()}`;
        ul.append(li);
    }
}

button[0].addEventListener('click', (t) => {
    t.preventDefault();
    const value = inputDisplay[0].value;
    validateField(value);
});
