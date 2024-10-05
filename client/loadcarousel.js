

$(document).ready(function(){


    $(".owl-carousel").owlCarousel({
        loop: false,

        items: 1,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: false,
        startPosition: 0 
    });

    $(".owl-carousel").on('changed.owl.carousel', function(event) {
        let currentIndex = event.item.index;
    
        $('.thumbnail li').removeClass('active');
    
        $('.thumbnail li').eq(currentIndex).addClass('active');
    });
    

});

function getRandom(arr, n) {
    let result = new Set();
    while(result.size < n) {
        result.add(arr[Math.floor(Math.random() * arr.length)]);
    }
    return [...result];
}

async function loadcarouseltext(){
    let response = await fetch('http://127.0.0.1:8080/carouselinfo');

    if(response.ok){
        let data = await response.json(); 
        let randomArtists = getRandom(data, 5); 
        let texts = document.querySelectorAll('.quote');
        console.log(randomArtists);
        texts[0].textContent = randomArtists[0].description;
        texts[1].textContent = randomArtists[1].description;
        texts[2].textContent = randomArtists[2].description;
        texts[3].textContent = randomArtists[3].description;
        texts[4].textContent = randomArtists[4].description;

        console.log("Artist IDs we have randomly chosen: ", randomArtists[0].id, randomArtists[1].id, randomArtists[2].id);

        loadcarouselimages(randomArtists);
    } else{
        alert(response.status);
    }
}




async function loadcarouselimages(randomArtists) {
    let fetchPromises = []; 

    for (let j = 0; j < randomArtists.length; j++) {
        fetchPromises.push(
            fetch(`http://127.0.0.1:8080/carouselimage/${randomArtists[j].id}`)
                .then(response => response.blob())
                .then(blob => {
                    let imageUrl = URL.createObjectURL(blob);

                    let imageElement = document.getElementById('image' + (j + 1))

                    imageElement.style.backgroundImage = 'url("' + imageUrl + '")';
                })
        );
    }

    Promise.all(fetchPromises).then(() => {
        $('.owl-carousel').trigger('refresh.owl.carousel');
    });
}


document.addEventListener("DOMContentLoaded", loadcarouseltext)
