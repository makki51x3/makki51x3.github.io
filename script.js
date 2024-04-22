document.addEventListener('DOMContentLoaded', function() {
    // Declare a variable to hold the TypeIt instance
    let typeItInstance = null;

    // Initialize a default TypeIt instance on page load
    typeItInstance = new TypeIt('#roastDisplay', {
        strings: ["Press 'Generate Roast' to start!"],
        startDelay: 500,
        typeSpeed: 50,
        backSpeed: 25,
        loop: false
    }).go();

    // Event listener for the roast generation button
    document.getElementById('generateBtn').addEventListener('click', function() {
        fetchJoke();
    });

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
                // Clear the previous joke
                if (typeItInstance) {
                    typeItInstance.destroy();
                }

                // Check the type of joke received and format accordingly
                const jokeText = data.type === 'single' ? data.joke : `${data.setup} ... ${data.delivery}`;

                // Display the new joke using TypeIt
                typeItInstance = new TypeIt('#roastDisplay', {
                    strings: [jokeText],
                    startDelay: 500,
                    typeSpeed: 50,
                    backSpeed: 25,
                    loop: false
                }).go();
            }
        })
        .catch(error => {
            document.getElementById('roastDisplay').innerText = "Error fetching a joke.";
            console.error("Fetch error:", error);
        });
}
