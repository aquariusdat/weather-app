const request = require('postman-request');
const geocode = (address, callback) => {
    if (address === '') {
        return;
    }

    const geocode_api_key = `pk.eyJ1IjoiYXF1YXJpdXNkYXQiLCJhIjoiY2tycnZpNjZnMGNkcTJ2bnBpZnpjZGY1MiJ9.nSojnpvrGa2OR7fsEvGuFA`
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geocode_api_key}`

    request({ url: geocodeURL }, (error, res) => {
        const data = JSON.parse(res.body);
        if (error) {
            callback('Unable to connect to location services.', undefined);
        }
        else if (data?.features[0]?.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            const lat = data?.features[0]?.center[1];
            const long = data?.features[0]?.center[0];
            const location = data?.features[0]?.place_name;

            callback(undefined, { lat: lat, long: long, location: location });
        }
    })
}

module.exports = geocode;