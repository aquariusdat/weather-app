const request = require('postman-request');
const forecast = (lat, long, kelvin, callback) => {
    const weather_api_key = `9353cf1c34278744a0a4dd8bbff8f252`
    const forcast_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weather_api_key}`

    request({ url: forcast_url }, (error, res) => {
        const data = JSON.parse(res.body);
        console.log(data)
        if (error) {
            callback('Unable to connect to weather services.', undefined);
        }
        else if (res.body.error) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            const temp = kelvin === true ? (data.main?.temp ?? 0) : convertIntoCelius(data.main.temp);
            const main = data?.weather[0].main ?? 'Clouds';
            const main_desc = data?.weather[0]?.description ?? 'Clouds';
            const icon = data?.weather[0]?.icon ?? 'clouds';
            const url_icon = `https://openweathermap.org/img/wn/${icon}@4x.png`

            callback(undefined, { temp: temp, main: main, main_desc: main_desc, icon: icon, url_icon: url_icon });
        }
    })
}

const convertIntoCelius = (kelvin) => {
    return kelvin - 273.15;
}

module.exports = forecast;