const form = document.getElementById("myForm");

const errorElement = document.createElement("div");
errorElement.id = "errorMessages";
form.appendChild(errorElement);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  //If we get an error, we don't want our previous errors to stay! So remove theme each time the submit button is pressed.
  errorElement.innerHTML = '';

  const formData = new FormData(form);
  console.log(formData);


  
  const fileInputs = ['formFile0', 'formFile1', 'formFile2', 'formFile3'];
  for (let i = 0; i < fileInputs.length; i++) {
    const fileInput = document.getElementById(fileInputs[i]);
    if (!fileInput.value) {
      errorElement.innerHTML = 'Please upload an image for image ' + String(i + 1);
      return;
    }
    const file = fileInput.files[0];
    if (!file.type.match('image/jpeg')) {
      errorElement.innerHTML = 'Image ' + String(i + 1) + ' must be a .jpg file';
      return;
    }
  }
  
  const response = await fetch("http://127.0.0.1:8080/entity/new", {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (!response.ok) {

      return response.json().then(err => { throw err; });
    }
    return response.json();
  })
  .then(data => {
    SetupArtistHeading();
    loadArtistsdropdown();
  })
  .catch(errors => {

    console.log(errors);
    console.log(JSON.stringify(errors, null, 2));
    if (errors && Array.isArray(errors.errors)) {
      errorElement.innerHTML = errors.errors.map(error => error.msg).join("<br>");
    } else {
      console.log('Unexpected error format:', errors);
    }
  });

});

