document.getElementById('generateBtn').addEventListener('click', function() {
    // Fetching jokes from the "Dark" and "Pun" categories with both "Single" and "Twopart" types
    fetch('https://v2.jokeapi.dev/joke/Dark,Pun?type=single,twopart')
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
            } else {
                // Displaying the joke or setup and delivery based on type
                if (data.type === 'single') {
                    document.getElementById('roastDisplay').innerText = data.joke;
                } else if (data.type === 'twopart') {
                    document.getElementById('roastDisplay').innerText = `${data.setup} ... ${data.delivery}`;
                }
            }
        })
        .catch(error => {
            document.getElementById('roastDisplay').innerText = "Error fetching a joke.";
        });
});
