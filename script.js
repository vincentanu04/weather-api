const UNSPLASH_API_KEY = "_c3NxG1sZOA1HfpR32_bFcYuAsVeEqUoXQmPEF782vs";

async function fetchWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=99957c311f1042c0bdf83440231611&q=${location}`);
    const json = await response.json();
    const parsedJSON = parseJSON(json);
    displayData(parsedJSON);
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
};

async function getPhotoUrl(description) {
    const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${UNSPLASH_API_KEY}&orientation=landscape&page=1&per_page=1&query=${description}`);
    const json = await response.json();
    return json.results[0].urls.full;
};

fetchWeather('poland')