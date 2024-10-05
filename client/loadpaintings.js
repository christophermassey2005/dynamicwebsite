
async function SetupPaintingDetails(i){
    console.log("Do we get here?");

    let response = await fetch('http://127.0.0.1:8080/paintingdetails');
    if(response.ok){
      let detailinformation = await response.json();
      console.log(detailinformation);

      let featuretteHeadings = document.querySelectorAll('.featurette-heading');
      let featuretteParagraphs = document.querySelectorAll('.featurette .lead');
        

      let buttons = document.querySelectorAll('.btn.btn-secondary.mt-3');

        buttons.forEach((btn) => {

            btn.style.display = 'none';
        });
      featuretteHeadings[0].textContent = detailinformation[i - 1][0];
      featuretteHeadings[0].style.display = 'block';
      console.log(detailinformation[i - 1][2]);
      featuretteParagraphs[0].innerHTML = detailinformation[i - 1][1] + "<br>" + "<br>" + detailinformation[i - 1][2] + "<br>" + "<br>" + "It is currently in " + detailinformation[i - 1][3];
      featuretteParagraphs[0].style.display = 'block';
      
      featuretteHeadings[1].textContent = "";
      featuretteHeadings[1].style.display = 'block';
      featuretteParagraphs[1].textContent = "" //detailinformation[i - 1][2];
      featuretteParagraphs[1].style.display = 'block';
  
  
      featuretteHeadings[2].textContent = "";
      featuretteHeadings[2].style.display = 'block';
      featuretteParagraphs[2].textContent = "" //detailinformation[i - 1][2];
      featuretteParagraphs[2].style.display = 'block';
      
  
    }
  
  
     else{
      alert("Sorry you cannot type you have a 404");
  
     }

    

  
    let placeholders = document.querySelectorAll('.featurette-image');
    for(let i = 0; i < placeholders.length; i++){
        placeholders[i].style.display = 'none';
    }

    let featuretteDividers = document.querySelectorAll('.featurette-divider');
    featuretteDividers[2].style.display = 'none';


    let imageresponse = await fetch(`http://127.0.0.1:8080/paintingthumbnail/${i}`);
      let blobpainting = await imageresponse.blob();
      let objectURLpainting = URL.createObjectURL(blobpainting);
      let imgpainting = document.createElement('img');
      imgpainting.src = objectURLpainting;
      imgpainting.width = 500;
      imgpainting.height = 500;  
      imgpainting.onload = function() {
          console.log('Image loaded');
        
          imgpainting.classList = placeholders[0].classList;   //images are 1 indexed, but placeholders data structure will be zero indexed
          placeholders[0].parentNode.replaceChild(imgpainting, placeholders[0]);

          imgpainting.style.display = 'block';
          featuretteDividers[0].style.display = 'block';
      };
      imgpainting.onerror = function() {
          console.log('Error loading image');
      };

    //Finally, scroll first image loaded into view.
    //placeholders[0].scrollIntoView();


    /*
    for (let j = start; j < end; j++) {
        let response = await fetch(`http://127.0.0.1:8080/image/${j}`);
        let blob = await response.blob();
        let objectURL = URL.createObjectURL(blob);
        let img = document.createElement('img');
        img.src = "";
        img.width = 500;
        img.height = 500;  
        img.onload = function() {
            console.log('Image loaded');
          
            let index = (j - 1) % 3  
            img.classList = placeholders[index].classList;  
            placeholders[index].parentNode.replaceChild(img, placeholders[index]);
  
            img.style.display = 'block';
            featuretteDividers[index].style.display = 'block';
        };
        img.onerror = function() {
            console.log('Error loading image');
        };
  
      placeholders[0].scrollIntoView();
      
  
    }
  */
    
  
  }





  
  function PaintingButtonPressed(i) { //This function is called when one of the "View Details" button is pressed. This is an indication to create a second GET request with the relevant details.
    return function() {
        console.log("Function painting is being executed");
        SetupPaintingDetails(i + 1)
      
      }
    }
  
  
    async function loadImageWithRetry(src, maxRetries = 3) {
      for(let i = 0; i < maxRetries; i++) {
          try {
              let response = await fetch(src);
              if(!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              } else {
                  let blob = await response.blob();
                  let url = URL.createObjectURL(blob);
                  return url;
              }
          } catch(err) {
              console.error(`Attempt ${i+1}: Failed to load image: ${err.message}`);
              if (i < maxRetries - 1) { 
                  await new Promise(resolve => setTimeout(resolve, 1000));
              }
          }
      }
      console.error('Failed to load image after maximum retries');
      return '';
  }
  
  async function SetupPaintingHeading(){
    let response = await fetch('http://127.0.0.1:8080/paintings');
    if(response.ok){
      document.querySelector('.row').classList.remove('hidden');
      let headings = await response.json();
      const rowElement = document.querySelector('.row');
  
      rowElement.innerHTML = '';
  
      for (let i = 0; i < headings.length; i++) {
          const colElement = document.createElement('div');
          const imgElement = document.createElement('img');
          const h2Element = document.createElement('h2');
          const pElement1 = document.createElement('p');
          const pElement2 = document.createElement('p');
          const aElement = document.createElement('a');
  
          colElement.className = 'col-lg-4';
          imgElement.className = 'bd-placeholder-img rounded-circle';
          imgElement.setAttribute('width', '140');
          imgElement.setAttribute('height', '140');
          imgElement.src = await loadImageWithRetry(`http://127.0.0.1:8080/paintingthumbnail/${i + 1}`); 
          h2Element.className = 'fw-normal';
          h2Element.textContent = headings[i][0]; 
          pElement1.textContent = headings[i][0] + ' was painted by ' + headings[i][1] + ".";
          aElement.className = 'btn btn-secondary';
          aElement.textContent = 'View details »';
  
          aElement.setAttribute('data-index', i + 1);
  
          aElement.addEventListener('click', PaintingButtonPressed(i));
          console.log("i is");
  
          pElement2.appendChild(aElement);
  
          colElement.appendChild(imgElement);
          colElement.appendChild(h2Element);
          colElement.appendChild(pElement1);
          colElement.appendChild(pElement2);
  
          rowElement.appendChild(colElement);
      }
    }
  }
  
  async function SetupPaintingHeadingViaIndex(indexvalue){
    let response = await fetch('http://127.0.0.1:8080/paintings');
    if(response.ok){
      document.querySelector('.row').classList.remove('hidden');
      let headings = await response.json();
      const rowElement = document.querySelector('.row');
  
      rowElement.innerHTML = '';
  
        const colElement = document.createElement('div');
        const imgElement = document.createElement('img');
        const h2Element = document.createElement('h2');
        const pElement1 = document.createElement('p');
        const pElement2 = document.createElement('p');
        const aElement = document.createElement('a');
  
        colElement.className = 'col-lg-4';
        imgElement.className = 'bd-placeholder-img rounded-circle';
        imgElement.setAttribute('width', '140');
        imgElement.setAttribute('height', '140');
        imgElement.src = await loadImageWithRetry(`http://127.0.0.1:8080/paintingthumbnail/${indexvalue + 1}`); 
        h2Element.className = 'fw-normal';
        h2Element.textContent = headings[indexvalue][0]; 
        pElement1.textContent = headings[indexvalue][0] + ' was painted by ' + headings[indexvalue][1] + ".";
        aElement.className = 'btn btn-secondary';
        aElement.textContent = 'View details »';
  
        aElement.setAttribute('data-index', indexvalue + 1);
  
        console.log("indexvalue is" + indexvalue);
        aElement.addEventListener('click', PaintingButtonPressed(indexvalue));
  
        pElement2.appendChild(aElement);
  
        colElement.appendChild(imgElement);
        colElement.appendChild(h2Element);
        colElement.appendChild(pElement1);
        colElement.appendChild(pElement2);
  
        rowElement.appendChild(colElement);
    }
  }
    
  
  
  //document.addEventListener("DOMContentLoaded", SetupArtistHeading);
  