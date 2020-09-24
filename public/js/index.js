const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#weather-data');
const messageTwo = document.querySelector('#error');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = e.target.location.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?location=${encodeURIComponent(address)}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = '';
                messageTwo.textContent = data.error;
                return;
            }
            messageOne.textContent = data.forecastData;
        });
    });
});