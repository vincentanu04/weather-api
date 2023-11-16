async function fetchWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=99957c311f1042c0bdf83440231611&q=${location}`);
    const json = await response.json();
    console.log(json);
    const parsedJSON = parseJSON(json);
    console.log(parsedJSON);
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
    const current = json.current
    const temp_c = current.temp_c
    const temp_f = current.temp_f

    const condition = current.condition
    const description = condition.text
    return {
        temp_c,
        temp_f,
        description
    }
};

fetchWeather('poland')