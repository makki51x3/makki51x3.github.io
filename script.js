document.addEventListener('DOMContentLoaded', function() {
    let typeItInstance = null;

    function initializeTypeIt() {
        return new TypeIt('#roastDisplay', {
            startDelay: 500,
            typeSpeed: 50,
            backSpeed: 25,
            loop: false
        });
    }

    function fetchJoke() {
        fetch('https://v2.jokeapi.dev/joke/Dark,Spooky?type=single,twopart')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
                } else {
                    const jokeText = data.type === 'single' ? data.joke : `${data.setup} ... ${data.delivery}`;

                    // Destroy the old instance if it exists
                    if (typeItInstance) {
                        typeItInstance.destroy();
                    }

                    // Reinitialize TypeIt
                    typeItInstance = initializeTypeIt();

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

    // Initialize TypeIt with a welcome message on load
    typeItInstance = new TypeIt('#roastDisplay', {
        strings: ["Press 'Generate Roast' to start!"],
        startDelay: 500,
        typeSpeed: 50,
        backSpeed: 25,
        loop: false
    }).go();

    // Replace 'generateBtn' with the logo element ID or class if different
    document.querySelector('.logo').addEventListener('click', fetchJoke);
});

// Function to generate a random delay between 1 to 2 seconds, returning milliseconds
function getRandomDelay() {
    return Math.floor(Math.random() * 1000) + 1000; // Random delay between 1000 and 2000 ms
}
