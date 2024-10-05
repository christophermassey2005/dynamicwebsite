

async function SetupDetails(i){
  let response = await fetch('http://127.0.0.1:8080/details');
  console.log("i i now!!!" + i)
  if(response.ok){
    let detailinformation = await response.json();
    console.log(detailinformation[0])
    let featuretteHeadings = document.querySelectorAll('.featurette-heading');
    let featuretteParagraphs = document.querySelectorAll('.featurette .lead');

    featuretteHeadings[0].textContent = detailinformation[i][0];
    featuretteHeadings[0].style.display = 'block';
    featuretteParagraphs[0].textContent = detailinformation[i][1];
    featuretteParagraphs[0].style.display = 'block';
    

    //Create buttons - could come back to this later?
    /*
    let featuretteDivs = document.querySelectorAll('.col-md-5');
    
    featuretteDivs.forEach((div, i) => {
        let existingButton = div.querySelector('button');
        if (existingButton) {
            div.removeChild(existingButton);
        }
    
        let btn = document.createElement('button');
    
        btn.className = 'btn btn-secondary mt-3';
        btn.textContent = 'View details »';
    
        btn.setAttribute('data-index', i + 1);
    
        btn.addEventListener('click', function() {
          SetupPaintingDetails(i + 1)   //i is zero for for da vinci, one for Gogh
        });
    
        div.appendChild(btn);
    });
            */



    featuretteHeadings[1].textContent = detailinformation[i][2];
    featuretteHeadings[1].style.display = 'block';
    featuretteParagraphs[1].textContent = detailinformation[i][3];
    featuretteParagraphs[1].style.display = 'block';


    featuretteHeadings[2].textContent = detailinformation[i][4];
    featuretteHeadings[2].style.display = 'block';
    featuretteParagraphs[2].textContent = detailinformation[i][5];
    featuretteParagraphs[2].style.display = 'block';


  }


   else{
    alert("Sorry you cannot type you have a 404");

   }

  
  let start = i * 3 + 1;
  let end = start + 3;

  let placeholders = document.querySelectorAll('.featurette-image');
  let featuretteDividers = document.querySelectorAll('.featurette-divider');
  
  for (let j = start; j < end; j++) {
      let response = await fetch(`http://127.0.0.1:8080/image/${j}`);
      let blob = await response.blob();
      let objectURL = URL.createObjectURL(blob);
      let img = document.createElement('img');
      img.src = objectURL;
      img.width = 500;
      img.height = 500;  
      img.onload = function() {
          console.log('Image loaded');
        
          let index = (j - 1) % 3  //Length of placeholders will always be 3 - but images will be 4, 5, 6, etc
          img.classList = placeholders[index].classList;   //images are 1 indexed, but placeholders data structure will be zero indexed
          placeholders[index].parentNode.replaceChild(img, placeholders[index]);

          img.style.display = 'block';
          featuretteDividers[index].style.display = 'block';
      };
      img.onerror = function() {
          console.log('Error loading image');
      };

    //Finally, scroll first image loaded into view.
    placeholders[0].scrollIntoView();

  }

  

}

function ButtonPressed(i) { //This function is called when one of the "View Details" button is pressed. This is an indication to create a second GET request with the relevant details.
  return function() {
    console.log("Function artist is being executed");
    SetupDetails(i)
    
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

async function SetupArtistHeading(){
  let response = await fetch('http://127.0.0.1:8080/artists');
  if(response.ok){
    document.querySelector('.row').classList.remove('hidden');
    let headings = await response.json();
    console.log(headings.length);
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
        imgElement.src = await loadImageWithRetry(`http://127.0.0.1:8080/carouselimage/${i + 1}`); 
        h2Element.className = 'fw-normal';
        h2Element.textContent = headings[i][0];
        pElement1.textContent = headings[i][0] + ' is known for ' + headings[i][1] + ".";
        aElement.className = 'btn btn-secondary';
        aElement.textContent = 'View details »';

        aElement.setAttribute('data-index', i + 1);

        aElement.addEventListener('click', ButtonPressed(i));

        pElement2.appendChild(aElement);

        colElement.appendChild(imgElement);
        colElement.appendChild(h2Element);
        colElement.appendChild(pElement1);
        colElement.appendChild(pElement2);

        rowElement.appendChild(colElement);
    }
  }
}

async function SetupArtistHeadingViaIndex(indexvalue){
  let response = await fetch('http://127.0.0.1:8080/artists');
  if(response.ok){
    document.querySelector('.row').classList.remove('hidden');
    let headings = await response.json();
    console.log("headings are" + headings[0]);
    console.log(headings.length);
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
      imgElement.src = await loadImageWithRetry(`http://127.0.0.1:8080/carouselimage/${indexvalue + 1}`); 
      h2Element.className = 'fw-normal';
      h2Element.textContent = headings[indexvalue][0]; 
      pElement1.textContent = headings[indexvalue][0] + ' is known for ' + headings[indexvalue][1] + ".";
      aElement.className = 'btn btn-secondary';
      aElement.textContent = 'View details »';


      aElement.setAttribute('data-index', indexvalue + 1);


      aElement.addEventListener('click', ButtonPressed(indexvalue));

      pElement2.appendChild(aElement);


      colElement.appendChild(imgElement);
      colElement.appendChild(h2Element);
      colElement.appendChild(pElement1);
      colElement.appendChild(pElement2);

      rowElement.appendChild(colElement);
  }
}
  



//document.addEventListener("DOMContentLoaded", SetupArtistHeading);
