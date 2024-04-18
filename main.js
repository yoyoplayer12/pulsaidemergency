document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("form").addEventListener('submit', function(event) {
        event.preventDefault();

        let address = document.querySelector('#callLocation').value;
        let extraInfo = document.querySelector('#callDescription').value;

        fetch(`https://api.tomtom.com/search/2/geocode/${address}.json?key=9mi9TL6F8ECK0hqq36RFJ4xLAlDXwOok`)
        .then(resp => resp.json())
        .then((geocodingResult) => {
            let longitude = geocodingResult['results'][0]['position']['lon'];
            let latitude = geocodingResult['results'][0]['position']['lat'];

            return fetch('https://api.pulsaid.be/api/v1/emergencies', {
                method: 'POST',
                mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ longitude, latitude, extraInfo })
            });
        })
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
            } else {
            }
        })
        .catch(error => {
        });
    }, false);
});