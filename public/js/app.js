const searchForm = document.querySelector('#search-form');
const addressInput = document.querySelector('#address');
const tempMessage = document.querySelector('#temp-msg');
const locationMessage = document.querySelector('#location-msg');
const descMessage = document.querySelector('#desc-msg');
const descImage = document.querySelector('#desc-img');
const locationImage = document.querySelector('#location-img');
const tempImage = document.querySelector('#temp-img');
const errorMessage = document.querySelector('#error-msg');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = addressInput.value;

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data?.error) {
                errorMessage.textContent = error;
                return false;
            }

            const { temp, main, main_desc, icon, url_icon, location } = data;
            locationMessage.textContent = `Location: ` + location;
            tempMessage.textContent = `Temp: ` + temp + ` Kelvin - ${convertIntoCelius(temp)} Celius`;
            descMessage.textContent = `Description: ` + main;
            descImage.src = `${url_icon}`;
            tempImage.src = `img/temp.svg`;
            locationImage.src = `img/map.svg`;
        })
    })
})

function convertIntoCelius(kelvin) {
    return Math.round((kelvin + (-272.15)) * 100) / 100;
}