/*
async function loadSearchResults(query){
    
    if(query.trim() === '') {
        document.getElementById('textBox').value = 'Please enter a search term.';
        return;
    }
    let response = await fetch('/search/' + encodeURIComponent(query));
    if(response.ok){
      let results = await response.json();
      document.getElementById('textBox').value = 'Found!';
      console.log("index is " + results.index)
    } else{
        document.getElementById('textBox').value = 'Could not find: Error Code: ' + response.status;
    }
    
}

let searchForm = document.getElementById("btn btn-outline-success");

searchForm.addEventListener('submit', async function(event){
    event.preventDefault();
    try{
    let query = document.getElementById("searchInput").value;
    console.log("query is" + typeof query);
    let intquery = parseInt(query);
    SetupArtistHeadingViaIndex(intquery);

    loadSearchResults(query);
    } catch(e) {
    alert(e);
    }
});
*/