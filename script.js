const UNSPLASH_API_KEY = "_c3NxG1sZOA1HfpR32_bFcYuAsVeEqUoXQmPEF782vs";
const search_button = document.querySelector('.search_button');
const input = document.querySelector('input');
const country = document.querySelector('.country');
const city = document.querySelector('.city');
const time = document.querySelector('.time');
const description = document.querySelector('.description');
const temp = document.querySelector('.temp');
const tempButton = document.querySelector('.switch');
const main = document.querySelector('main');
const loadingElement = document.createElement('img');
loadingElement.src = "https://media4.giphy.com/media/TAjMWrPR2Zka3T1M7z/giphy.gif?cid=ecf05e47far2ijw88o8hop5kyeqoysy7psu19ssodbx23rm2&ep=v1_stickers_search&rid=giphy.gif&ct=s";
loadingElement.classList.add('loading');

let globalJSON;
let celsiusNotFahrenheit = true;

async function fetchWeather(location) {
    main.appendChild(loadingElement);
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=99957c311f1042c0bdf83440231611&q=${location}`);
        const json = await response.json();
        const parsedJSON = parseJSON(json);
        globalJSON = parsedJSON;
        displayData(parsedJSON);
    } catch (err) {
        alert(err);
    } finally {
        main.removeChild(loadingElement);
    };
};

function parseJSON(json) {
    const locationObj = parseLocation(json);
    const currentObj = parseCurrent(json);
    return {
        ...locationObj,
        ...currentObj
    };
};

function parseLocation(json) {
    const location = json.location;
    const country = location.country;
    const city = location.name;
    const localTime = location.localtime;
    return {
        country,
        city,
        localTime
    };
};

function parseCurrent(json) {
    const current = json.current;
    const temp_c = current.temp_c;
    const temp_f = current.temp_f;

    const condition = current.condition;
    const description = condition.text;
    return {
        temp_c,
        temp_f,
        description
    };
};

async function displayData(json) {
    const descriptionPhotoUrl = await getPhotoUrl(json.description);
    document.body.style.backgroundImage = `url(${descriptionPhotoUrl})`;

    country.textContent = json.country;
    city.textContent = json.city;
    time.textContent = 'Local Time: ' + json.localTime;

    description.textContent = json.description;
    temp.textContent = json.temp_c + '°C';
};

async function getPhotoUrl(description) {
    const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${UNSPLASH_API_KEY}&orientation=landscape&page=1&per_page=1&query=${description}`);
    const json = await response.json();
    return json.results[0].urls.full;
};

function changeTemp() {
    if (celsiusNotFahrenheit) {
        tempButton.textContent = 'Change to °C';
        temp.textContent = globalJSON.temp_f + '°F';
        celsiusNotFahrenheit = false
    } else {
        tempButton.textContent = 'Change to °F';
        temp.textContent = globalJSON.temp_c + '°C';
        celsiusNotFahrenheit = true
    };
};

search_button.addEventListener('click', () => fetchWeather(input.value))

tempButton.addEventListener('click', () => changeTemp())

input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        fetchWeather(input.value);
    }
});

fetchWeather('Kuala Lumpur')