async function SetupArtistHeading(){
    let response = await fetch('http://127.0.0.1:8080/artists');
    if(response.ok){
      let headings = await response.json();

      const rowElement = document.querySelector('.row');

      // Clear the existing content
      rowElement.innerHTML = '';

      // Iterate over headings and create new elements
      for (let i = 0; i < headings.length; i++) {
          // Create new elements
          const colElement = document.createElement('div');
          const svgElement = document.createElement('svg');
          const h2Element = document.createElement('h2');
          const pElement1 = document.createElement('p');
          const pElement2 = document.createElement('p');
          const aElement = document.createElement('a');

          // Set attributes and content
          colElement.className = 'col-lg-4';
          svgElement.className = 'bd-placeholder-img rounded-circle';
          svgElement.setAttribute('width', '140');
          svgElement.setAttribute('height', '140');
          svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          svgElement.setAttribute('role', 'img');
          svgElement.setAttribute('aria-label', 'Placeholder');
          svgElement.setAttribute('preserveAspectRatio', 'xMidYMid slice');
          svgElement.setAttribute('focusable', 'false');
          svgElement.innerHTML = '<title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/>';
          h2Element.className = 'fw-normal';
          h2Element.textContent = headings[i][0]; // Use the first item as the heading
          pElement1.textContent = headings[i][0] + ' is known for ' + headings[i][1] + ".";
          aElement.className = 'btn btn-secondary';
          aElement.href = '#';
          aElement.textContent = 'View details »';
          pElement2.appendChild(aElement);

          // Append new elements to the column
          colElement.appendChild(svgElement);
          colElement.appendChild(h2Element);
          colElement.appendChild(pElement1);
          colElement.appendChild(pElement2);

          // Append the column to the row
          rowElement.appendChild(colElement);
            
      
      }


    }
}


// Call this function at the end of "loadartists.js"
