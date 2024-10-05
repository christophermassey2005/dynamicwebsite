

function checkServer() {
    fetch('http://127.0.0.1:8080/heartbeat')
        .then(response => {
            if (!response.ok) {
                throw new Error('Server is down');
            }
            let errorMessageDiv = document.querySelector('.Errormesssage');
            errorMessageDiv.innerHTML = '';
            $('#errorModal').modal('hide');

            return response.text();

        })
        .then(message => {
            console.log(message);  
        })
        .catch(error => {
            //let errorMessageDiv = document.querySelector('.Errormesssage');
            //let currentMessage = errorMessageDiv.innerHTML;
            //errorMessageDiv.innerHTML = 'Connection to server lost. Retrying...';
            $('#errorModal').modal('show');
            setTimeout(checkServer, 1000);
        });
}

setInterval(checkServer, 1000);


