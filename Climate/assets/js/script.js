document.querySelector('#search').addEventListener('submit', async (event) => {
    // Prevent form submission
    event.preventDefault();

    // Store the data entered by the user
    let input = document.querySelector('#search-input').value;

    if (input !== '') {
        clearInfo();
        showWarning('Carregando...');

        // Store the request result
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ff8336ebe0ee55dff31a03f12f1f6731&units=metric&lang=pt_br`);
        // Transform the result of the request to json
        let json = await results.json();

        // Check if the city was found in the request
        if (json.cod == 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed, 
                windAngle: json.wind.deg
            });
        }
        else {
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }
    }
    else {
        clearInfo();
    }
}); 

// Show the information to the user
function showInfo(json) {
    showWarning('');

    document.querySelector('#title').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('#temperature-info').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('#wind-info').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('#temperature img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#wind-point').style.transform = `rotate(${json.windAngle - 90}deg)`;
    document.querySelector('#result').style.display = 'block';
}

// Hide the result field when searching for the city
function clearInfo() {
    showWarning('');
    document.querySelector('#result').style.display = 'none';
}

// Displaying a warn message to the user
function showWarning(message) {
    document.querySelector('#warning').innerHTML = message;
}