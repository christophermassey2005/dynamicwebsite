// Get the form and the file inputs
const form = document.getElementById("myForm");
const fileInput1 = document.getElementById("formFile1");
const fileInput2 = document.getElementById("formFile2");
const fileInput3 = document.getElementById("formFile3");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Create a new FormData instance
  const formData = new FormData();

  // Append the files to the FormData instance
  formData.append("image1", fileInput1.files[0]);
  formData.append("image2", fileInput2.files[0]);
  formData.append("image3", fileInput3.files[0]);

  // Send the images to the server
  const response = await fetch("http://127.0.0.1:8080/entity/new", {
    method: "POST",
    body: formData
  });

  // TODO: Handle the response
});