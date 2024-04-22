document.addEventListener('DOMContentLoaded', function() {
    // Initialize the TypeIt effect
    new TypeIt('#roastDisplay', {
        strings: ["Press 'Generate Roast' to start!"],
        startDelay: 500,
        typeSpeed: 50,
        backSpeed: 25,
        loop: false
    }).go();

    // Automatically fetch a joke on page load
    fetchJoke();
});

function fetchJoke() {
    // Fetching jokes from the "Dark" and "Spooky" categories with both "Single" and "Twopart" types
    fetch('https://v2.jokeapi.dev/joke/Dark,Spooky?type=single,twopart')
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
}
