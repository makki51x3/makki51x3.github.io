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

                    // Reset and clear the existing instance before reusing
                    typeItInstance.reset();

                    if (jokeText.includes("...")) {
                        const parts = jokeText.split("...");
                        // Type the first part
                        typeItInstance.type(parts[0])
                        .exec(() => {
                            // Ensure the pause is effective and only then proceed
                            setTimeout(() => {
                                // Clear after the first part and start the second part
                                typeItInstance.empty().type(parts[1]).go();
                            }, getRandomDelay());
                        }).go();
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

// Function to generate a random delay between 1 to 2 seconds
function getRandomDelay() {
    return Math.floor(Math.random() * 1000) + 1000; // Random delay between 1000 and 2000 ms
}
