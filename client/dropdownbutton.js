async function loadArtistsdropdown() {
    const response = await fetch('/artistsdropdown');
    if (!response.ok) {
      console.error('An error occurred:', response.status);
      return;
    }
    const data = await response.json();
    const $dropdown = document.querySelector('#artists');

    $dropdown.innerHTML = '';

    const noneOption = document.createElement('option');
    noneOption.value = 'none';
    noneOption.textContent = 'None';
    $dropdown.appendChild(noneOption);

    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All';
    $dropdown.appendChild(allOption);

    data.forEach(function(artist) {
      const option = document.createElement('option');
      option.value = artist.id;
      option.textContent = artist.name;
      $dropdown.appendChild(option);
    });
}

let button = document.querySelector('.btn.btn-outline-success');

button.addEventListener('click', function() {
    let dropdownartists = document.querySelector('#artists');
    let dropdwonpaintings = document.querySelector('#paintings');

    let selectedArtistId = dropdownartists.value;
    let selectedPaintingId = dropdwonpaintings.value;

    if (selectedArtistId === 'none') {
    } else if (selectedArtistId === 'all') {
        SetupArtistHeading();
    } else {
        console.log('Selected artist id: ' + selectedArtistId);
        let selectedArtistIdint = parseInt(selectedArtistId)
        SetupArtistHeadingViaIndex(selectedArtistIdint - 1);
    }

    if (selectedPaintingId === 'none') {
    } else if (selectedPaintingId === 'all') {
        SetupPaintingHeading();
    } else {
        console.log('Selected artist id: ' + selectedPaintingId);
        let selectedPaintingIdint = parseInt(selectedPaintingId)
        SetupPaintingHeadingViaIndex(selectedPaintingIdint - 1);
    }
});



async function loadPaintingsdropdown() {
    const response = await fetch('/paintingsdropdown');
    if (!response.ok) {
      console.error('An error occurred:', response.status);
      return;
    }
    const data = await response.json();
    const $dropdown = document.querySelector('#paintings');

    $dropdown.innerHTML = '';

    const noneOption = document.createElement('option');
    noneOption.value = 'none';
    noneOption.textContent = 'None';
    $dropdown.appendChild(noneOption);

    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All';
    $dropdown.appendChild(allOption);

    data.forEach(function(painting) {
      const option = document.createElement('option');
      option.value = painting.id;
      option.textContent = painting.name;
      $dropdown.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', loadArtistsdropdown);
document.addEventListener('DOMContentLoaded', loadPaintingsdropdown);

