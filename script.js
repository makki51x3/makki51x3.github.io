document.addEventListener('DOMContentLoaded', function() {
    let typeItInstance = new TypeIt('#roastDisplay', {
        startDelay: 500,
        typeSpeed: 50,
        backSpeed: 25,
        loop: false
    });

    function fetchJoke() {
        fetch('https://v2.jokeapi.dev/joke/Dark,Spooky?type=single,twopart')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
                } else {
                    const jokeText = data.type === 'single' ? data.joke : `${data.setup} ... ${data.delivery}`;

                    // Explicitly clear the content of #roastDisplay
                    document.getElementById('roastDisplay').innerHTML = "";

                    // Ensure the TypeIt instance is properly reset
                    if (typeItInstance) {
                        typeItInstance.destroy();
                    }

                    // Reinitialize TypeIt instance with new settings
                    typeItInstance = new TypeIt('#roastDisplay', {
                        startDelay: 500,
                        typeSpeed: 50,
                        backSpeed: 25,
                        loop: false
                    });

                    if (jokeText.includes("...")) {
                        const parts = jokeText.split("...");
                        typeItInstance.type(parts[0])
                        .pause(getRandomDelay())
                        .type(parts[1])
                        .go();
                    } else {
                        typeItInstance.type(jokeText).go();
                    }
                }
            })
            .catch(error => {
                document.getElementById('roastDisplay').innerText = "Error fetching a joke.";
                console.error("Fetch error:", error);
            });
    }

    // Event listener for the roast generation button to fetch and display a new joke
    document.getElementById('generateBtn').addEventListener('click', fetchJoke);
});

// Function to generate a random delay between 1 to 2 seconds, returning milliseconds
function getRandomDelay() {
    return Math.floor(Math.random() * 1000) + 1000; // Random delay between 1000 and 2000 ms
}
