document.addEventListener('DOMContentLoaded', function() {
    // Set up the initial TypeIt instance with a guiding message
    let typeItInstance = new TypeIt('#roastDisplay', {
        strings: ["Click the logo to generate a roast!"],
        startDelay: 500,
        typeSpeed: 50,
        backSpeed: 25,
        loop: false
    }).go();

    // Reference to the logo that acts as the generate button
    const logoButton = document.querySelector('.logo');

    // Event listener for the logo to fetch and display a new joke
    logoButton.addEventListener('click', fetchJoke);

    function fetchJoke() {
        // Ensure there's no ongoing TypeIt instance
        if (typeItInstance) {
            typeItInstance.destroy();
        }

        fetch('https://v2.jokeapi.dev/joke/Dark,Spooky?type=single,twopart')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
                } else {
                    const jokeText = data.type === 'single' ? data.joke : `${data.setup} ... ${data.delivery}`;

                    // Reinitialize TypeIt instance to display the new joke
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
});

// Function to generate a random delay between 1 to 2 seconds
function getRandomDelay() {
    return Math.floor(Math.random() * 1000) + 1000; // Random delay between 1000 and 2000 ms
}
