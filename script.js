document.getElementById('generateBtn').addEventListener('click', function() {
    fetch('https://v2.jokeapi.dev/joke/Any?type=single')
        .then(response => response.json())
               .then(data => {
            if(data.error) {
                document.getElementById('roastDisplay').innerText = "Failed to fetch a roast.";
            } else {
                document.getElementById('roastDisplay').innerText = data.joke;
            }
        })
        .catch(error => {
            document.getElementById('roastDisplay').innerText = "Error fetching a roast.";
        });
});
