document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("form").addEventListener('submit', function(event) {
        event.preventDefault();
    
        const longitude = parseFloat(document.querySelector('.longitude').value);
        const latitude = parseFloat(document.querySelector('.latitude').value);
        const extraInfo = document.querySelector('.extraInfo').value;
    
        // Controleer of de velden zijn ingevuld
        if (!longitude || !latitude || !extraInfo) {
            document.querySelector('.error').style.display = 'block';
            return;
        }

    
        fetch('https://pulsaidapi.onrender.com/api/v1/emergencies', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ longitude, latitude, extraInfo })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
                document.querySelector('.success').style.display = 'block';
            } else {
                document.querySelector('.error').style.display = 'block';
            }
        })
        .catch(error => {
            document.querySelector('.error').style.display = 'block';
        });
    });
});